import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError(""); setOk(""); setLoading(true);
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      setOk(data?.message || "Usuário registrado com sucesso");
      setTimeout(() => navigate("/login"), 600);
    } catch (err) {
      setError(err?.response?.data?.message || "Erro ao registrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1>Cadastro</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Nome" />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Senha" type="password" />
        {error && <div style={{ border: "1px solid #ccc", padding: 10 }}>{error}</div>}
        {ok && <div style={{ border: "1px solid #ccc", padding: 10 }}>{ok}</div>}
        <button disabled={loading}>{loading ? "Cadastrando..." : "Cadastrar"}</button>
      </form>
      <p style={{ marginTop: 10 }}>
        Já tem conta? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
