import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import PublicLayout from "../components/PublicLayout";

export default function AdminProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = useMemo(() => !!id, [id]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("outro");
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(!!isEdit);
  const [error, setError] = useState("");

  function validate() {
    if (!name.trim()) return "Nome é obrigatório.";
    if (!description.trim()) return "Descrição é obrigatória.";
    if (!imageUrl.trim()) return "Imagem (URL) é obrigatória.";
    const nPrice = Number(price);
    if (Number.isNaN(nPrice) || nPrice <= 0) return "Preço inválido.";
    const nStock = Number(stock);
    if (Number.isNaN(nStock) || nStock < 0) return "Estoque inválido.";
    return "";
  }

  useEffect(() => {
    async function loadOne() {
      if (!isEdit) return;
      setError("");
      setLoadingPage(true);
      try {
        const { data } = await api.get(`/products/${id}`); // público
        setName(data?.name || "");
        setDescription(data?.description || "");
        setPrice(String(data?.price ?? ""));
        setCategory(data?.category || "outro");
        setImageUrl(data?.imageUrl || "");
        setStock(String(data?.stock ?? 0));
      } catch (err) {
        setError(err?.response?.data?.message || "Erro ao carregar produto.");
      } finally {
        setLoadingPage(false);
      }
    }
    loadOne();
  }, [id, isEdit]);

  async function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setError("");
    setLoading(true);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      imageUrl: imageUrl.trim(),
      stock: Number(stock),
    };

    try {
      if (isEdit) {
        await api.put(`/products/${id}`, payload); // admin
      } else {
        await api.post(`/products`, payload); // admin
      }
      navigate("/admin/products");
    } catch (err) {
      setError(err?.response?.data?.message || "Erro ao salvar produto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicLayout>
      <div className="container" style={{ padding: "22px 0" }}>
        <h1 style={{ marginTop: 0 }}>{isEdit ? "Editar Produto" : "Novo Produto"}</h1>

        {loadingPage ? (
          <p>Carregando...</p>
        ) : (
          <form onSubmit={onSubmit} style={{ maxWidth: 720, display: "grid", gap: 12 }}>
            {error && (
              <div style={{ border: "1px solid #f3b", padding: 12, borderRadius: 10 }}>
                {error}
              </div>
            )}

            <label style={label}>
              Nome
              <input style={input} value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label style={label}>
              Descrição
              <textarea
                style={{ ...input, minHeight: 90 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label style={label}>
                Preço (R$)
                <input style={input} value={price} onChange={(e) => setPrice(e.target.value)} />
              </label>

              <label style={label}>
                Estoque
                <input style={input} value={stock} onChange={(e) => setStock(e.target.value)} />
              </label>
            </div>

            <label style={label}>
              Categoria
              <select style={input} value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="notebook">notebook</option>
                <option value="smartphone">smartphone</option>
                <option value="acessorio">acessorio</option>
                <option value="outro">outro</option>
              </select>
            </label>

            <label style={label}>
              URL da Imagem
              <input style={input} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </label>

            {imageUrl?.trim() && (
              <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 12, width: "fit-content" }}>
                <p style={{ margin: "0 0 8px", fontWeight: 800 }}>Prévia</p>
                <img
                  src={imageUrl}
                  alt="preview"
                  style={{ width: 220, height: 160, objectFit: "cover", borderRadius: 12 }}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
              >
                Cancelar
              </button>

              <button
                disabled={loading}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: "#1f3b63",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 900,
                }}
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </PublicLayout>
  );
}

const label = { display: "grid", gap: 6, fontWeight: 800 };
const input = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  outline: "none",
};
