import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";

export default function AdminProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = useMemo(() => !!id, [id]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("outro");
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState("0");

  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(!!isEdit);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

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
      setOk("");
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
      setOk("");
      return;
    }

    setError("");
    setOk("");
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
        setOk("Produto atualizado com sucesso!");
      } else {
        await api.post(`/products`, payload); // admin
        setOk("Produto criado com sucesso!");
      }

      setTimeout(() => navigate("/admin/products"), 500);
    } catch (err) {
      setError(err?.response?.data?.message || "Erro ao salvar produto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <Header />
      <CategoryBar />

      <section className="container" style={{ padding: "26px 0 50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", opacity: 0.8 }}>
              <Link to="/admin/products" style={{ textDecoration: "none" }}>Admin</Link>
              <span>›</span>
              <span>{isEdit ? "Editar" : "Novo produto"}</span>
            </div>

            <h1 style={{ margin: "10px 0 0" }}>
              {isEdit ? "Editar Produto" : "Novo Produto"}
            </h1>
            <p style={{ margin: "6px 0 0", opacity: 0.75 }}>
              {isEdit ? "Atualize as informações do produto." : "Cadastre um novo produto na TechParts."}
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              style={btnGhost}
            >
              Voltar
            </button>
          </div>
        </div>

        <div style={{ marginTop: 16, background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: 18 }}>
          {loadingPage ? (
            <p>Carregando...</p>
          ) : (
            <form onSubmit={onSubmit} style={{ maxWidth: 820, display: "grid", gap: 12 }}>
              {error && (
                <div style={alertError}>
                  <strong>Ops!</strong> {error}
                </div>
              )}
              {ok && (
                <div style={alertOk}>
                  <strong>Sucesso!</strong> {ok}
                </div>
              )}

              <label style={label}>
                Nome
                <input style={input} value={name} onChange={(e) => setName(e.target.value)} />
              </label>

              <label style={label}>
                Descrição
                <textarea
                  style={{ ...input, minHeight: 110, resize: "vertical" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label style={label}>
                  Preço (R$)
                  <input
                    style={input}
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </label>

                <label style={label}>
                  Estoque
                  <input
                    style={input}
                    type="number"
                    step="1"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
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

              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 420px", opacity: 0.85 }}>
                  <p style={{ margin: 0 }}>
                    Dica: use imagens com boa qualidade (ex.: Unsplash) e formato JPG/PNG.
                  </p>
                </div>

                <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12, width: 260 }}>
                  <p style={{ margin: "0 0 8px", fontWeight: 900 }}>Prévia</p>
                  {imageUrl?.trim() ? (
                    <img
                      src={imageUrl}
                      alt="preview"
                      style={{ width: "100%", height: 170, objectFit: "cover", borderRadius: 12 }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div style={{ height: 170, borderRadius: 12, background: "#fafafa", display: "grid", placeItems: "center", color: "#888" }}>
                      Sem imagem
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button type="button" onClick={() => navigate("/admin/products")} style={btnGhost}>
                  Cancelar
                </button>

                <button disabled={loading} style={btnPrimary}>
                  {loading ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

const label = { display: "grid", gap: 6, fontWeight: 900 };
const input = {
  padding: "11px 12px",
  borderRadius: 12,
  border: "1px solid #ddd",
  outline: "none",
  fontWeight: 600,
};

const btnGhost = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 900,
};

const btnPrimary = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid transparent",
  background: "#1f3b67",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 900,
};

const alertError = {
  border: "1px solid #ffd0d0",
  background: "#fff5f5",
  padding: 12,
  borderRadius: 12,
};

const alertOk = {
  border: "1px solid #cdebd6",
  background: "#f1fff6",
  padding: 12,
  borderRadius: 12,
};
