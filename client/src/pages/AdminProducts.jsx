import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import PublicLayout from "../components/PublicLayout";

export default function AdminProducts() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    setLoading(true);
    try {
      const { data } = await api.get("/products"); // público
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Erro ao carregar produtos.");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id) {
    const ok = window.confirm("Deseja excluir este produto?");
    if (!ok) return;

    try {
      await api.delete(`/products/${id}`); // admin
      setItems((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || "Erro ao excluir produto.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <PublicLayout>
      <div className="container" style={{ padding: "22px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <h1 style={{ margin: 0 }}>Admin - Produtos</h1>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={load}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Recarregar
            </button>

            <button
              onClick={() => navigate("/admin/products/new")}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                background: "#1f3b63",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              + Novo Produto
            </button>
          </div>
        </div>

        {loading && <p style={{ marginTop: 16 }}>Carregando...</p>}
        {error && (
          <div style={{ marginTop: 16, border: "1px solid #f0c", padding: 12, borderRadius: 10 }}>
            {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div style={{ marginTop: 18, border: "1px solid #eee", padding: 16, borderRadius: 12 }}>
            Nenhum produto cadastrado ainda. Clique em <strong>“Novo Produto”</strong>.
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div style={{ marginTop: 18, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th style={th}>Imagem</th>
                  <th style={th}>Nome</th>
                  <th style={th}>Preço</th>
                  <th style={th}>Categoria</th>
                  <th style={th}>Estoque</th>
                  <th style={th}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p._id}>
                    <td style={td}>
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        style={{ width: 64, height: 48, objectFit: "cover", borderRadius: 10, border: "1px solid #eee" }}
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    </td>
                    <td style={td}>{p.name}</td>
                    <td style={td}>
                      {Number(p.price || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </td>
                    <td style={td}>{p.category}</td>
                    <td style={td}>{p.stock}</td>
                    <td style={td}>
                      <div style={{ display: "flex", gap: 10 }}>
                        <button
                          onClick={() => navigate(`/admin/products/${p._id}/edit`)}
                          style={btnOutline}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => onDelete(p._id)}
                          style={btnDanger}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}

const th = {
  padding: "12px 10px",
  borderBottom: "2px solid #eee",
  color: "#111",
};

const td = {
  padding: "12px 10px",
  borderBottom: "1px solid #f2f2f2",
  verticalAlign: "middle",
};

const btnOutline = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

const btnDanger = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #ffd6d6",
  background: "#fff5f5",
  cursor: "pointer",
  fontWeight: 800,
};
