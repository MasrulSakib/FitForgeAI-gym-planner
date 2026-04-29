import { Link } from "react-router-dom";
import { UserButton } from "@neondatabase/neon-js/auth/react";
import { Button } from "../../ui/Button";
import { useAuth } from "../../context/AuthContext";
import Logo from "../Logo";


export default function Navbar() {
    const { user } = useAuth();
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="max-w-full mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-2.5 text-foreground hover:opacity-90 transition-opacity"
                >
                    <Logo size={28} />
                    <span className="font-bold text-lg tracking-tight">
                        Fit<span className="text-[var(--color-accent)]">Forge</span>
                    </span>
                </Link>

                <nav className="flex items-center gap-2">
                    {user ? (
                        <>
                            <Link to="/profile">
                                <Button variant="ghost" size="sm">
                                    My Plan
                                </Button>
                            </Link>
                            <UserButton className="bg-accent/60" />
                        </>
                    ) : (
                        <>
                            <Link to="/auth/sign-in">
                                <Button variant="ghost" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/auth/sign-up">
                                <Button size="sm">Sign Up</Button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
