import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const plan = false;
    const { user, isLoading } = useAuth();

    if (!user && !isLoading) {
        return <Navigate to="/auth/sign-in" replace />
    }

    if (!plan) {
        return <Navigate to="/onboarding" replace />
    }

    return <div>
        Onboading Page
    </div>
}
