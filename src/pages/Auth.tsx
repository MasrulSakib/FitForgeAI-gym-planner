import { AuthView } from "@neondatabase/neon-js/auth/react";
import { useParams } from "react-router-dom";

export default function Auth() {
  const { pathname } = useParams();
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <AuthView className="text-amber-50 bg-black/80" pathname={pathname} />
      </div>
    </div>
  );
}
