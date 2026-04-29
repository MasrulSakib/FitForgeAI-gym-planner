import { type HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'bordered' | 'glow';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', variant = 'default', children, ...props }, ref) => {
        const base = 'rounded-2xl p-6 transition-all duration-300';

        const variants = {
            default: 'bg-[var(--color-card)]/80 backdrop-blur-sm',
            bordered: 'bg-[var(--color-card)]/80 border border-[var(--color-border)] backdrop-blur-sm hover:border-[var(--color-accent)]/30',
            glow: 'bg-[var(--color-card)]/80 border border-[var(--color-accent)]/20 backdrop-blur-sm shadow-[0_0_24px_-4px_var(--color-accent-glow)] hover:shadow-[0_0_32px_0px_var(--color-accent-glow)]',
        };

        return (
            <div
                ref={ref}
                className={`${base} ${variants[variant]} ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
