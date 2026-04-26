import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthUser } from "../types";
import { authClient } from "../lib/auth";

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;

}


const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [neonUser, setNeonUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUsers() {
            try {
                const result = await authClient.getSession();
                if (result && result.data?.user) {
                    setNeonUser(result.data.user);
                }
                else {
                    setNeonUser(null);
                }
            } catch (error) {
                console.log(error);
                setNeonUser(null);
            } finally {
                setIsLoading(false);
            }
        }
        loadUsers()
    }, [])


    return (
        <AuthContext.Provider value={{ user: neonUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}