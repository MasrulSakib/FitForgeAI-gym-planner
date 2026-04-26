import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthUser, UserProfile } from "../types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    saveProfile: (
        profile: Omit<UserProfile, "userId" | "updatedAt">,
    ) => Promise<void>;
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

    async function saveProfile(
        profileData: Omit<UserProfile, "userId" | "updatedAt">,
    ) {
        console.log(profileData);
        if (!neonUser) {
            throw new Error("No user logged in");
        }
        await api.saveProfile(neonUser.id, profileData);
    }

    return (
        <AuthContext.Provider value={{ user: neonUser, isLoading, saveProfile }}>
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