# FitForge AI 🏋️‍♂️🤖

FitForge AI is a state-of-the-art, AI-powered gym planner designed to help you achieve your fitness goals with precision. Built using the **PERN stack**, it leverages artificial intelligence to generate personalized, periodized training plans based on your unique profile, experience, and available equipment.

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

## ✨ Key Features

- **AI-Driven Personalization**: Generate custom workout plans using advanced AI models.
- **Dynamic Onboarding**: Tailor your experience by providing goals, experience level, equipment, and more.
- **Progress Tracking**: Store and manage multiple training plans.
- **Premium UI/UX**: Modern, responsive design built with Tailwind CSS 4 and DaisyUI.
- **Secure Authentication**: Integrated with Neon Auth for seamless user management.
- **Periodized Plans**: Smart generation of sets, reps, and exercises optimized for your specific goals.

## 🚀 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **AI Integration**: [OpenRouter API](https://openrouter.ai/) (OpenAI compatible)

### Database & Auth
- **Database**: [PostgreSQL (Neon)](https://neon.tech/)
- **Authentication**: [Neon Auth](https://neon.tech/docs/guides/auth-neon-auth)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A PostgreSQL database (Neon recommended)
- OpenRouter API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MasrulSakib/GymAI-planner.git
   cd react-gym-ai-planner
   ```

2. **Install dependencies:**
   ```bash
   # Install root and frontend dependencies
   npm install

   # Install server dependencies
   cd server
   npm install
   cd ..
   ```

3. **Environment Setup:**
   Create a `.env` file in the root and `server` directories based on the configuration below.

4. **Database Migration:**
   ```bash
   cd server
   npx prisma generate
   # npx prisma db push (to sync schema with database)
   cd ..
   ```

5. **Run the application:**
   ```bash
   # In root (Frontend)
   npm run dev

   # In /server (Backend)
   npm run dev:server
   ```

---

## ⚙️ Environment Variables

### Root `.env` (Frontend)
```env
VITE_API_URL=http://localhost:3001
VITE_NEON_AUTH_URL=your_neon_auth_url
```

### Server `.env` (Backend)
```env
PORT=3001
BASE_URL=http://localhost:3001
DATABASE_URL=your_postgresql_connection_string
OPEN_ROUTER_KEY=your_openrouter_api_key
CLIENT_URL=http://localhost:5173
```

---

## 📂 Project Structure

```text
├── src/                # Frontend source code
│   ├── components/     # UI Components
│   ├── pages/          # Application pages
│   ├── lib/            # Shared utilities
│   └── main.tsx        # Frontend entry point
├── server/             # Backend source code
│   ├── src/
│   │   ├── routes/     # API routes
│   │   ├── lib/        # Backend logic (AI, Prisma)
│   │   └── index.ts    # Server entry point
│   └── prisma/         # Database schema
└── public/             # Static assets
```

---

## 🌐 Deployment

The project is configured for deployment on **Vercel**. 
- Frontend is deployed as a static site.
- Backend is deployed as Vercel Functions (Serverless).

To deploy your own version, simply connect your repository to Vercel and ensure all environment variables are correctly configured in the Vercel dashboard.

---

## 📄 License

This project is licensed under the ISC License.

---

<p align="center">Made with ❤️ for Fitness Enthusiasts</p>
