import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";
import Sobre from "../pages/About";
import Contato from "../pages/Contact";

import AdminProducts from "../pages/AdminProducts";
import AdminProductForm from "../pages/AdminProductForm";
import AdminRoute from "../components/AdminRoute";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contato" element={<Contato />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/products/:id" element={<ProductDetails />} />

      {/* Perfil (precisa estar logado) */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route path="/admin" element={<Navigate to="/admin/products" replace />} />

      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/products/new"
        element={
          <AdminRoute>
            <AdminProductForm />
          </AdminRoute>
        }
      />

      {/* ✅ ROTA DE EDIÇÃO (usa useParams no AdminProductForm) */}
      <Route
        path="/admin/products/:id"
        element={
          <AdminRoute>
            <AdminProductForm />
          </AdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
