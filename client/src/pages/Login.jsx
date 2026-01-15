import "../styles/auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PublicLayout from "../components/PublicLayout";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    if (!email.trim() || !password.trim()) return "Preencha email e senha.";
    if (!isValidEmail(email)) return "Email inválido. Ex: nome@dominio.com";
    if (password.trim().length < 6) return "Senha deve ter pelo menos 6 caracteres.";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    const msg = validate();
    if (msg) return setError(msg);

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicLayout>
      <div className="authWrap">
        <div className="authCard">
          <h1 className="authTitle">Login</h1>

          <form onSubmit={onSubmit} className="authForm">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              type="password"
              autoComplete="current-password"
            />

            {error && <div className="authAlert error">{error}</div>}

            <button className="authBtn" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="authLink">
            Não tem conta? <Link to="/register">Cadastrar</Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
