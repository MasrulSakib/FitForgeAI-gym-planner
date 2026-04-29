interface LogoProps {
    size?: number;
    className?: string;
}

export default function Logo({ size = 32, className = "" }: LogoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="bolt-grad" x1="28" y1="8" x2="36" y2="56" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#c4b5fd" />
                    <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
            </defs>
            {/* Outer rounded square */}
            <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#logo-grad)" opacity="0.15" />
            <rect x="2" y="2" width="60" height="60" rx="16" stroke="url(#logo-grad)" strokeWidth="2" fill="none" />
            {/* Dumbbell bar */}
            <rect x="14" y="29" width="36" height="6" rx="3" fill="url(#logo-grad)" opacity="0.6" />
            {/* Dumbbell left weight */}
            <rect x="10" y="22" width="10" height="20" rx="3" fill="url(#logo-grad)" />
            {/* Dumbbell right weight */}
            <rect x="44" y="22" width="10" height="20" rx="3" fill="url(#logo-grad)" />
            {/* Lightning bolt overlay */}
            <path
                d="M36 12L26 33h8l-4 20 14-23h-9l5-18z"
                fill="url(#bolt-grad)"
                opacity="0.9"
            />
        </svg>
    );
}
