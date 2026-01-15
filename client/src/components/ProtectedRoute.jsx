import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) return null; // ou um Loader
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
