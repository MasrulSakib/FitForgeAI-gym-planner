import { createContext, use, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types";
import { authClient } from "../lib/auth";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
}


const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [neonUser, setNeonUser] = useState<any>(null);
    const [isloading, setIsLoading] = useState(true);

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
        <AuthContext.Provider value={{ user: neonUser, isloading }}>
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