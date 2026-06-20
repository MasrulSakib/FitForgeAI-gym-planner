import { AuthView } from "@neondatabase/neon-js/auth/react";
import { useParams, Link } from "react-router-dom";
import Logo from "../components/Logo";
import { ArrowLeft } from "lucide-react";

export default function Auth() {
  const { pathname } = useParams();

  return (
    <div className="relative min-h-screen pt-24 pb-12 px-6 flex flex-col items-center justify-center overflow-hidden bg-[var(--color-background)]">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent)]/8 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--color-accent-secondary)]/5 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-md w-full z-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Branding header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-secondary)]/10 border border-[var(--color-accent)]/20 flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(124,58,237,0.15)]">
            <Logo size={28} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Fit<span className="text-[var(--color-accent)]">Forge</span>
          </h1>
          <p className="text-sm text-[var(--color-muted)] mt-2">
            Build your personalized, AI-powered gym plan
          </p>
        </div>

        {/* Auth component container with subtle hover shadow and glassmorphism styling */}
        <div className="bg-[var(--color-card)]/40 border border-[var(--color-border)] rounded-3xl p-4 md:p-6 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-[var(--color-accent)]/25 transition-all duration-300">
          <AuthView pathname={pathname} />
        </div>
      </div>
    </div>
  );
}
