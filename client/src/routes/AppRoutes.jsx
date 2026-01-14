import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import AdminProducts from "../pages/AdminProducts";
import AdminProductForm from "../pages/AdminProductForm";
import AdminRoute from "../components/AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin/products"
        element={<AdminRoute><AdminProducts /></AdminRoute>}
      />
      <Route
        path="/admin/products/new"
        element={<AdminRoute><AdminProductForm mode="create" /></AdminRoute>}
      />
      <Route
        path="/admin/products/:id/edit"
        element={<AdminRoute><AdminProductForm mode="edit" /></AdminRoute>}
      />
    </Routes>
  );
}
