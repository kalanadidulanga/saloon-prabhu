// src/components/PublicOnlyRoute.tsx
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
