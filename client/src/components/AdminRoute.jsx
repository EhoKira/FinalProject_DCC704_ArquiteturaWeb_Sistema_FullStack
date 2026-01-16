import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute({ children }) {
  const { user, isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <p style={{ padding: 20 }}>Carregando...</p>;
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
