import { type Request, type Response, Router } from "express";

export const profileRouter = Router();

profileRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, ...profileData } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const {
      goal,
      experience,
      daysPerWeek,
      sessionLength,
      equipment,
      injuries,
      preferredSplit,
    } = profileData;

    if (
      !goal ||
      !experience ||
      !daysPerWeek ||
      !sessionLength ||
      !equipment ||
      !preferredSplit
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});
