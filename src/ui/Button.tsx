import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className = "", variant = "primary", size = "md", children, ...props },
        ref,
    ) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

        const variants = {
            primary:
                "bg-gradient-to-r from-[var(--color-accent)] to-[#6d28d9] text-white shadow-[0_0_0_0_var(--color-accent-glow)] hover:shadow-[0_0_24px_4px_var(--color-accent-glow)] hover:brightness-110",
            secondary:
                "bg-[var(--color-card)]/80 text-[var(--color-foreground)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-card-hover)] backdrop-blur-sm",
            ghost:
                "text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-card)]",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-5 py-2.5 text-base",
            lg: "px-8 py-3 text-lg",
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = "Button";
