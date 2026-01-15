import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute({ children }) {
  const { isAuthenticated, user, loadingAuth } = useAuth();

  if (loadingAuth) return null; // ou um Loader
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return user?.role === "admin" ? children : <Navigate to="/" replace />;
}
