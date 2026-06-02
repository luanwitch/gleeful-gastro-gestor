import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/services/authService";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}