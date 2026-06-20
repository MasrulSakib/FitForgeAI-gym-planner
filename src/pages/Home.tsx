import { Link } from "react-router-dom";
import {
    Zap,
    Target,
    Calendar,
    ArrowRight,
    Sparkles,
    Clock,
    UserCheck,
    Brain,
    Dumbbell,
    ChevronRight,
    Star,
} from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    );
}

function TwitterIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    );
}

function YoutubeIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
    );
}

function GithubIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
    );
}

import { useAuth } from "../context/AuthContext";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import Logo from "../components/Logo";


const features = [
    {
        icon: Sparkles,
        title: "AI-Powered Plans",
        description:
            "Get a training program tailored to your goals, experience, and schedule.",
    },
    {
        icon: Target,
        title: "Goal-Oriented",
        description:
            "Whether you want to build muscle, lose fat, or get stronger — we optimize for your goal.",
    },
    {
        icon: Calendar,
        title: "Flexible Scheduling",
        description:
            "Plans that fit your lifestyle. Train 2 days or 6 — we adapt to you.",
    },
    {
        icon: Clock,
        title: "Time-Efficient",
        description:
            "Every workout is designed to maximize results in your available time.",
    },
];

const steps = [
    {
        icon: UserCheck,
        number: "01",
        title: "Tell Us About You",
        description: "Share your fitness goals, experience level, schedule, and equipment access.",
    },
    {
        icon: Brain,
        number: "02",
        title: "AI Builds Your Plan",
        description: "Our AI analyzes your profile and crafts a science-backed training program.",
    },
    {
        icon: Dumbbell,
        number: "03",
        title: "Start Training",
        description: "Follow your personalized plan and track your progress week by week.",
    },
];

const stats = [
    { value: "10K+", label: "Plans Generated" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "50+", label: "Exercise Library" },
    { value: "24/7", label: "AI Availability" },
];

export default function Home() {
    const { user, isLoading, plan } = useAuth();

    return (
        <div className="min-h-screen overflow-hidden">
            {/* ─── Hero Section ─── */}
            <section className="relative pt-32 pb-24 px-6">


                {/* Animated background orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[var(--color-accent)]/8 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-[var(--color-accent-secondary)]/6 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-accent)]/5 rounded-full blur-[80px]" />
                </div>

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />

                <div className="relative max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-card)]/80 border border-[var(--color-accent)]/20 mb-8 backdrop-blur-sm">
                        <Zap className="w-4 h-4 text-[var(--color-accent)]" />
                        <span className="text-sm text-[var(--color-muted)]">
                            AI-powered training plans
                        </span>
                        <ChevronRight className="w-3 h-3 text-[var(--color-muted)]" />
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.05]">
                        Your Perfect
                        <br />
                        <span className="bg-gradient-to-r from-[var(--color-accent)] via-[#a78bfa] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                            Gym Plan
                        </span>{" "}
                        in Seconds
                    </h1>

                    <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
                        Stop guessing. Get a personalized training program built by AI,
                        tailored to your goals, experience, and schedule.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {isLoading ? (
                            <div className="h-12 w-40 bg-card border border-border animate-pulse rounded-lg" />
                        ) : user ? (
                            plan ? (
                                <>
                                    <Link to="/profile">
                                        <Button size="lg" className="gap-2 w-full sm:w-auto">
                                            My Plan
                                            <ArrowRight className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <Link to="/onboarding">
                                        <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                            Change Plan
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/onboarding">
                                    <Button size="lg" className="gap-2 w-full sm:w-auto">
                                        Create Plan
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                            )
                        ) : (
                            <>
                                <Link to="/auth/sign-up">
                                    <Button size="lg" className="gap-2 w-full sm:w-auto">
                                        Get Started Free
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link to="/auth/sign-in">
                                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                                        Sign In
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ─── Stats Bar ─── */}
            <section className="relative py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-0 md:justify-between bg-[var(--color-card)]/60 border border-[var(--color-border)] rounded-2xl px-8 py-6 backdrop-blur-sm">
                        {stats.map((stat, i) => (
                            <div key={stat.label} className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs md:text-sm text-[var(--color-muted)]">
                                        {stat.label}
                                    </p>
                                </div>
                                {i < stats.length - 1 && (
                                    <div className="hidden md:block w-px h-10 bg-[var(--color-border)] ml-4" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── How It Works ─── */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-3">
                            How It Works
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Three Steps to Your{" "}
                            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                                Dream Physique
                            </span>
                        </h2>
                        <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
                            Getting a world-class training plan has never been this easy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 relative">
                        {steps.map((step, i) => (
                            <div key={step.number} className="relative group">
                                {/* Connecting dashed line between cards (desktop only) */}
                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] z-0">
                                        <div className="w-full border-t-2 border-dashed border-[var(--color-accent)]/25" />
                                    </div>
                                )}

                                {/* Card */}
                                <div className="relative z-10 bg-[var(--color-card)]/80 border border-[var(--color-border)] rounded-2xl p-8 text-center hover:border-[var(--color-accent)]/30 transition-all duration-300 h-full backdrop-blur-sm">
                                    {/* Step number badge */}
                                    <span className="inline-block text-[10px] font-bold tracking-widest text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3 py-1 rounded-full mb-5 uppercase">
                                        Step {step.number}
                                    </span>

                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/15 to-[var(--color-accent-secondary)]/10 border border-[var(--color-accent)]/20 flex items-center justify-center mx-auto mb-5 group-hover:shadow-[0_0_24px_4px_var(--color-accent-glow)] transition-all duration-300">
                                        <step.icon className="w-6 h-6 text-[var(--color-accent)]" />
                                    </div>

                                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                    <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Features Grid ─── */}
            <section className="py-24 px-6 relative">
                {/* Background accent */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--color-accent)]/5 rounded-full blur-[120px]" />
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-widest mb-3">
                            Features
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Why FitForge?
                        </h2>
                        <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto">
                            We combine fitness expertise with AI to create programs that
                            actually work for you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature) => (
                            <Card
                                key={feature.title}
                                variant="bordered"
                                className="group hover:border-[var(--color-accent)]/40 hover:shadow-[0_0_20px_-4px_var(--color-accent-glow)]"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/15 to-[var(--color-accent-secondary)]/10 flex items-center justify-center mb-4 group-hover:from-[var(--color-accent)]/25 group-hover:to-[var(--color-accent-secondary)]/15 transition-all duration-300">
                                    <feature.icon className="w-6 h-6 text-[var(--color-accent)]" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Testimonial / Trust ─── */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <Card variant="glow" className="text-center py-12 px-8">
                        <div className="flex justify-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                            ))}
                        </div>
                        <blockquote className="text-lg md:text-xl font-medium mb-4 leading-relaxed">
                            "I went from random gym sessions to a structured plan that actually
                            showed results. FitForge AI understood exactly what I needed."
                        </blockquote>
                        <p className="text-[var(--color-muted)] text-sm">
                            — Alex K., Intermediate Lifter
                        </p>
                    </Card>
                </div>
            </section>

            {/* ─── Follow Us Section ─── */}
            <section className="py-24 px-6 relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--color-accent)]/8 rounded-full blur-[100px]" />
                </div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Connect With{" "}
                        <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] bg-clip-text text-transparent">
                            Our Community
                        </span>
                    </h2>
                    <p className="text-[var(--color-muted)] text-lg mb-12 max-w-xl mx-auto">
                        Follow us on social media for training tips, updates, and daily motivation to push your limits.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--color-card)]/50 border border-[var(--color-border)] hover:border-[#e1306c]/40 hover:shadow-[0_0_20px_rgba(225,48,108,0.15)] transition-all duration-300 backdrop-blur-sm"
                        >
                            <InstagramIcon className="w-8 h-8 text-[var(--color-muted)] group-hover:text-[#e1306c] transition-colors duration-300 mb-3" />
                            <span className="font-semibold text-sm">Instagram</span>
                            <span className="text-xs text-[var(--color-muted)] mt-1">@fitforge</span>
                        </a>

                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--color-card)]/50 border border-[var(--color-border)] hover:border-[#1da1f2]/40 hover:shadow-[0_0_20px_rgba(29,161,242,0.15)] transition-all duration-300 backdrop-blur-sm"
                        >
                            <TwitterIcon className="w-8 h-8 text-[var(--color-muted)] group-hover:text-[#1da1f2] transition-colors duration-300 mb-3" />
                            <span className="font-semibold text-sm">Twitter</span>
                            <span className="text-xs text-[var(--color-muted)] mt-1">@fitforge_ai</span>
                        </a>

                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--color-card)]/50 border border-[var(--color-border)] hover:border-[#ff0000]/40 hover:shadow-[0_0_20px_rgba(255,0,0,0.15)] transition-all duration-300 backdrop-blur-sm"
                        >
                            <YoutubeIcon className="w-8 h-8 text-[var(--color-muted)] group-hover:text-[#ff0000] transition-colors duration-300 mb-3" />
                            <span className="font-semibold text-sm">YouTube</span>
                            <span className="text-xs text-[var(--color-muted)] mt-1">FitForge AI</span>
                        </a>

                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--color-card)]/50 border border-[var(--color-border)] hover:border-[#6e5494]/40 hover:shadow-[0_0_20px_rgba(110,84,148,0.15)] transition-all duration-300 backdrop-blur-sm"
                        >
                            <GithubIcon className="w-8 h-8 text-[var(--color-muted)] group-hover:text-[#6e5494] transition-colors duration-300 mb-3" />
                            <span className="font-semibold text-sm">GitHub</span>
                            <span className="text-xs text-[var(--color-muted)] mt-1">fitforge-ai</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── Footer ─── */}
            <footer className="border-t border-[var(--color-border)] py-8 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <Link to="/" className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
                        <Logo size={22} />
                        <span className="font-bold text-sm">
                            Fit<span className="text-[var(--color-accent)]">Forge</span>
                        </span>
                    </Link>
                    <p className="text-xs text-[var(--color-muted)]">
                        © {new Date().getFullYear()} FitForge AI. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
