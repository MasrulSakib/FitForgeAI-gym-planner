import OpenAI from "openai";
import dotenv from "dotenv";
import { TrainingPlan, UserProfile, RawPlanResponse } from "../../types/types";

dotenv.config();

// Singleton to avoid recreating the client on every request
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (openaiClient) return openaiClient;

  const apiKey = process.env.OPEN_ROUTER_KEY;
  if (!apiKey) {
    throw new Error("OPEN_ROUTER_KEY is not set in environment variables");
  }

  openaiClient = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": process.env.BASE_URL || "http://localhost:3001",
      "X-Title": "GymAI Plan Generator",
    },
  });

  return openaiClient;
}

// Some free-tier models wrap JSON in ```json ... ``` despite being told not to
function stripMarkdownFences(content: string): string {
  let cleaned = content.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "");
  cleaned = cleaned.replace(/```\s*$/g, "");
  return cleaned.trim();
}

// Free-tier models may hit max_tokens and produce truncated JSON — this repairs it
function repairTruncatedJson(json: string): string {
  try {
    JSON.parse(json);
    return json;
  } catch {
    // Continue to repair
  }

  let repaired = json.trim();
  let inString = false;
  let escaped = false;
  const stack: string[] = [];

  for (let i = 0; i < repaired.length; i++) {
    const ch = repaired[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (ch === "\\" && inString) {
      escaped = true;
      continue;
    }

    if (ch === '"') {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (ch === "{") stack.push("}");
      else if (ch === "[") stack.push("]");
      else if (ch === "}" || ch === "]") stack.pop();
    }
  }

  // Close unclosed string literal
  if (inString) {
    repaired += '"';
  }

  // Strip dangling fragments: incomplete key-value pairs or trailing commas
  repaired = repaired.replace(/,\s*"[^"]*"\s*:\s*$/, "");
  repaired = repaired.replace(/,\s*"[^"]*"\s*$/, "");
  repaired = repaired.replace(/,\s*$/, "");

  // Close remaining open brackets/braces in reverse order
  while (stack.length > 0) {
    repaired += stack.pop();
  }

  try {
    JSON.parse(repaired);
  } catch {
    console.error("[AI] JSON repair failed:", repaired.slice(-200));
    throw new Error("AI response could not be parsed as valid JSON even after repair");
  }

  return repaired;
}

const MAX_RETRIES = 1;
const RETRY_DELAY_MS = 2000;

export async function generateTrainingPlan(
  profile: Partial<UserProfile>,
): Promise<Omit<TrainingPlan, "id" | "userId" | "version" | "createdAt">> {
  const normalizedProfile: UserProfile = {
    goal: profile.goal || "bulk",
    experience: profile.experience || "intermediate",
    days_per_week: profile.days_per_week || 4,
    session_length: profile.session_length || 60,
    equipment: profile.equipment || "full_gym",
    injuries: profile.injuries || null,
    preferred_split: profile.preferred_split || "upper_lower",
  };

  const openai = getOpenAIClient();
  const prompt = buildPrompt(normalizedProfile);
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`[AI] Retry attempt ${attempt}/${MAX_RETRIES}...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }

      const completion = await openai.chat.completions.create({
        model: process.env.AI_MODEL || "openrouter/free",
        messages: [
          {
            role: "system",
            content:
              "You are an expert fitness trainer and program designer. You must respond with valid, complete JSON only. Do not include any markdown, code fences, reasoning, or additional text. Keep responses concise.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
        max_tokens: 6000,
      });

      const finishReason = completion?.choices?.[0]?.finish_reason;
      if (finishReason === "length") {
        console.warn("[AI] Response truncated (finish_reason=length). Attempting repair.");
      }

      const content = completion?.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("No content in AI response");
      }

      const cleanedContent = stripMarkdownFences(content);
      const repairedContent = repairTruncatedJson(cleanedContent);
      const planData: RawPlanResponse = JSON.parse(repairedContent);

      if (!planData.weeklySchedule || planData.weeklySchedule.length === 0) {
        throw new Error("AI response missing weeklySchedule data");
      }

      return formatPlanResponse(planData, normalizedProfile);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`[AI] Error (attempt ${attempt + 1}/${MAX_RETRIES + 1}):`, lastError.message);

      // Don't retry on auth/payment errors — they won't resolve on retry
      if (
        lastError.message.includes("OPEN_ROUTER_KEY") ||
        lastError.message.includes("402") ||
        lastError.message.includes("401")
      ) {
        break;
      }
    }
  }

  throw lastError || new Error("Failed to generate training plan");
}

// Maps raw AI response to the structured TrainingPlan format with fallback defaults
function formatPlanResponse(
  aiResponse: RawPlanResponse,
  profile: UserProfile,
): Omit<TrainingPlan, "id" | "userId" | "version" | "createdAt"> {
  return {
    overview: {
      goal: aiResponse.overview?.goal || `Customized ${profile.goal} program`,
      frequency: aiResponse.overview?.frequency || `${profile.days_per_week} days per week`,
      split: aiResponse.overview?.split || profile.preferred_split,
      notes: aiResponse.overview?.notes || "Follow the program consistently for best results.",
    },
    weeklySchedule: (aiResponse.weeklySchedule || []).map((day) => ({
      day: day.day || "Day",
      focus: day.focus || "Full Body",
      exercises: (day.exercises || []).map((ex) => ({
        name: ex.name || "Exercise",
        sets: Number(ex.sets || 3),
        reps: ex.reps !== undefined ? String(ex.reps) : "8-12",
        rest: ex.rest || "60-90 sec",
        rpe: Number(ex.rpe || 7),
        notes: ex.notes,
        alternatives: ex.alternatives,
      })),
    })),
    progression:
      aiResponse.progression ||
      "Increase weight by 2.5-5lbs when you can complete all sets with good form. Track your progress weekly.",
  };
}

function buildPrompt(profile: UserProfile): string {
  const goalMap: Record<string, string> = {
    bulk: "build muscle and gain size",
    cut: "lose fat and maintain muscle",
    recomp: "simultaneously lose fat and build muscle",
    strength: "build maximum strength",
    endurance: "improve cardiovascular endurance and stamina",
  };

  const experienceMap: Record<string, string> = {
    beginner: "beginner (0-1 years of training experience)",
    intermediate: "intermediate (1-3 years of training experience)",
    advanced: "advanced (3+ years of training experience)",
  };

  const equipmentMap: Record<string, string> = {
    full_gym: "full gym access with all equipment",
    home: "home gym with limited equipment",
    dumbbells: "only dumbbells available",
  };

  const splitMap: Record<string, string> = {
    full_body: "full body workouts",
    upper_lower: "upper/lower split",
    ppl: "push/pull/legs split",
    custom: "best split for their goals",
  };

  return `Create a personalized ${profile.days_per_week}-day per week training plan for someone with the following profile:

Goal: ${goalMap[profile.goal] || profile.goal}
Experience Level: ${experienceMap[profile.experience] || profile.experience}
Session Length: ${profile.session_length} minutes per session
Equipment: ${equipmentMap[profile.equipment] || profile.equipment}
Preferred Split: ${splitMap[profile.preferred_split] || profile.preferred_split}
${profile.injuries ? `Injuries/Limitations: ${profile.injuries}` : ""}

Generate a CONCISE training plan in JSON format with this exact structure:
{
  "overview": {
    "goal": "brief description of the training goal",
    "frequency": "X days per week",
    "split": "training split name",
    "notes": "important notes about the program (1-2 sentences max)"
  },
  "weeklySchedule": [
    {
      "day": "Monday",
      "focus": "muscle group or focus area",
      "exercises": [
        {
          "name": "Exercise Name",
          "sets": 4,
          "reps": "6-8",
          "rest": "2-3 min",
          "rpe": 8,
          "notes": "brief form cue (optional)",
          "alternatives": ["Alt 1", "Alt 2"]
        }
      ]
    }
  ],
  "progression": "progression strategy (1-2 sentences)"
}

Requirements:
- Create exactly ${profile.days_per_week} workout days
- Each workout should fit within ${profile.session_length} minutes
- Include 4-6 exercises per workout
- RPE (Rate of Perceived Exertion) should be 6-9
- Include compound movements for beginners/intermediate, advanced can have more isolation
- Match the preferred split type: ${profile.preferred_split}
- ${profile.injuries ? `Avoid exercises that could aggravate: ${profile.injuries}` : ""}
- Provide exercise alternatives where appropriate
- Make it progressive and suitable for ${experienceMap[profile.experience] || profile.experience} level
- Keep notes and descriptions SHORT to stay within token limits

Return ONLY the JSON object (no markdown, no extra text).
`;
}
