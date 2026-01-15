import "../styles/auth.css";
import PublicLayout from "../components/PublicLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  function validate() {
    if (!name.trim() || !email.trim() || !password.trim()) return "Preencha todos os campos.";
    if (name.trim().length < 2) return "Nome muito curto.";
    if (!isValidEmail(email)) return "Email inválido. Ex: nome@dominio.com";
    if (password.trim().length < 6) return "Senha deve ter pelo menos 6 caracteres.";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setOk("");

    const msg = validate();
    if (msg) return setError(msg);

    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });
      setOk(data?.message || "Usuário registrado com sucesso!");
      setTimeout(() => navigate("/login"), 600);
    } catch (err) {
      setError(err?.response?.data?.message || "Erro ao registrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicLayout>
      <div className="authWrap">
        <div className="authCard">
          <h1 className="authTitle">Cadastro</h1>

          <form onSubmit={onSubmit} className="authForm">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password" autoComplete="new-password" />

            {error && <div className="authAlert error">{error}</div>}
            {ok && <div className="authAlert ok">{ok}</div>}

            <button className="authBtn" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>

          <p className="authLink">
            Já tem conta? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
