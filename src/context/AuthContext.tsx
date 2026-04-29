/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { AuthUser, TrainingPlan, UserProfile } from "../types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";

interface AuthContextType {
    user: AuthUser | null;
    plan: TrainingPlan | null;
    isLoading: boolean;
    saveProfile: (
        profile: Omit<UserProfile, "userId" | "updatedAt">,
    ) => Promise<void>;
    generatePlan: () => Promise<void>;
    refreshUserData: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [neonUser, setNeonUser] = useState<AuthUser | null>(null);
    const [plan, setPlan] = useState<TrainingPlan | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isRefreshingRef = useRef(false);

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

    useEffect(() => {
        if (!isLoading) {
            if (neonUser?.id) {
                refreshData();
            } else {
                setPlan(null);
            }
            setIsLoading(false);
        }
    }, [neonUser?.id, isLoading])

    // refresh Data
    const refreshData = useCallback(async () => {
        if (!neonUser || isRefreshingRef.current) return;
        isRefreshingRef.current = true;
        try {
            const currentPlan = await api.getCurrentPlan(neonUser.id);
            setPlan(currentPlan);
        } catch (error) {
            console.log("No plan found or error fetching plan:", error);
            setPlan(null);
        } finally {
            isRefreshingRef.current = false;
        }
    }, [neonUser?.id]);

    async function saveProfile(
        profileData: Omit<UserProfile, "userId" | "updatedAt">,
    ) {
        console.log(profileData);
        if (!neonUser) {
            throw new Error("No user logged in");
        }
        await api.saveProfile(neonUser.id, profileData);
        await refreshData();
    }

    async function generatePlan() {
        if (!neonUser) {
            throw new Error("user must be authenticated to generate plan");
        }
        await api.generatePlan(neonUser.id);
        await refreshData();
    }

    return (
        <AuthContext.Provider value={{ user: neonUser, plan, isLoading, saveProfile, generatePlan, refreshUserData: refreshData }}>
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