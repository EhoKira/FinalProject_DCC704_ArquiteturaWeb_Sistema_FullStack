import "../styles/adminProducts.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import { api } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

function formatBRL(v) {
  const n = Number(v || 0);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function stockClass(stock) {
  const s = Number(stock || 0);
  if (s <= 0) return "adminStockNo";
  if (s <= 5) return "adminStockLow";
  return "adminStockOk";
}

export default function AdminProducts() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errInfo, setErrInfo] = useState(null);

  async function load() {
    setLoading(true);
    setErrInfo(null);

    try {
      const { data } = await api.get("/products");
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      const status = err?.response?.status;
      const message =
        err?.response?.data?.message || err?.message || "Erro ao carregar produtos.";

      setErrInfo({ status, message, raw: err?.response?.data });

      if (status === 401) {
        logout();
        navigate("/login", { replace: true });
      }
      if (status === 403) {
        navigate("/", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      await api.delete(`/products/${id}`);
      await load();
    } catch (err) {
      alert(err?.response?.data?.message || "Erro ao excluir produto.");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <Header />
      <CategoryBar />

      <section className="container adminWrap">
        <div className="adminTop">
          <div className="adminTitle">
            <h1>Admin - Produtos</h1>
            <p>Criar, editar e remover produtos.</p>
          </div>

          <div className="adminActions">
            <button onClick={load} type="button" className="adminBtn">
              Recarregar
            </button>

            <button
              onClick={() => navigate("/admin/products/new")}
              type="button"
              className="adminBtn adminBtnPrimary"
            >
              + Novo Produto
            </button>
          </div>
        </div>

        {loading && <p style={{ marginTop: 14 }}>Carregando...</p>}

        {!loading && errInfo && (
          <div className="adminErrorBox">
            <strong>Erro ao carregar produtos</strong>
            <div style={{ marginTop: 6 }}>
              <div>
                <b>Status:</b> {errInfo.status ?? "—"}
              </div>
              <div>
                <b>Mensagem:</b> {errInfo.message}
              </div>
            </div>
          </div>
        )}

        {!loading && !errInfo && (
          <div style={{ marginTop: 14 }}>
            {products.length === 0 ? (
              <p>Nenhum produto encontrado.</p>
            ) : (
              <div className="adminCard">
                <table className="adminTable">
                  <thead>
                    <tr>
                      <th>Imagem</th>
                      <th>Nome</th>
                      <th>Preço</th>
                      <th>Categoria</th>
                      <th>Estoque</th>
                      <th>Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id} className="adminRow">
                        <td>
                          <div className="adminMobileRow">
                            <img
                              src={p.imageUrl}
                              alt={p.name}
                              className="adminImg"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://via.placeholder.com/48?text=IMG";
                              }}
                            />
                            <div style={{ display: "none" }} />
                          </div>
                        </td>

                        <td className="adminName">{p.name}</td>

                        <td>{formatBRL(p.price)}</td>

                        <td>
                          <span className="adminTag">{p.category}</span>
                        </td>

                        <td className={stockClass(p.stock)}>{p.stock ?? 0}</td>

                        <td className="adminActionsCell">
                          <button
                            type="button"
                            onClick={() => navigate(`/admin/products/${p._id}`)}
                            className="adminMiniBtn"
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(p._id)}
                            className="adminMiniBtn adminDanger"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
