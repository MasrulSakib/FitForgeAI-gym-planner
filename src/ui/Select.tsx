import { type SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', label, error, id, options, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label htmlFor={id} className="text-sm font-medium text-foreground">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    id={id}
                    className={`w-full px-4 py-2.5 bg-[var(--color-card-hover)] border border-[var(--color-border)] rounded-xl text-foreground focus:outline-none focus:border-[var(--color-accent)]/60 focus:shadow-[0_0_0_3px_var(--color-accent-glow)] transition-all duration-200 cursor-pointer ${className}`}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <span className="text-sm text-red-400">{error}</span>}
            </div>
        );
    }
);

Select.displayName = 'Select';
