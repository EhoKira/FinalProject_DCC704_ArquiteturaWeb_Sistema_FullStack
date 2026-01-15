import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80";

const mockOrders = [
  { id: "TP-1021", date: "10/01/2026", total: 499.57, status: "Entregue" },
  { id: "TP-1044", date: "12/01/2026", total: 260.0, status: "Em transporte" },
];

function formatBRL(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

const cardMini = {
  border: "1px solid #eee",
  borderRadius: 14,
  padding: 16,
  background: "#fafafa",
};

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { favorites } = useFavorites();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const isAdmin = user?.role === "admin";
  const showOrders = !isAdmin && favorites.length > 0 ? mockOrders : [];

  return (
    <div className="page">
      <Header />
      <CategoryBar />

      <section className="container" style={{ padding: "26px 0 50px" }}>
        {/* topo */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 22,
            border: "1px solid #eee",
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <img
              src={DEFAULT_AVATAR}
              alt="Foto do perfil"
              style={{
                width: 70,
                height: 70,
                borderRadius: 16,
                objectFit: "cover",
                border: "2px solid #ff7a00",
              }}
            />
            <div style={{ flex: 1 }}>
              <h1 style={{ margin: 0 }}>
                {isAdmin ? "Painel do Administrador" : "Meu Perfil"}
              </h1>
              <p style={{ margin: "6px 0 0", opacity: 0.8 }}>
                {isAdmin
                  ? "Gerencie produtos e operações da TechParts."
                  : "Gerencie suas informações e acompanhe seus pedidos."}
              </p>
            </div>
          </div>

          <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                padding: 12,
                borderRadius: 12,
                background: "#fafafa",
                border: "1px solid #eee",
              }}
            >
              <strong>Nome</strong>
              <span>{user?.name || "-"}</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                padding: 12,
                borderRadius: 12,
                background: "#fafafa",
                border: "1px solid #eee",
              }}
            >
              <strong>Email</strong>
              <span>{user?.email || "-"}</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr",
                padding: 12,
                borderRadius: 12,
                background: "#fafafa",
                border: "1px solid #eee",
              }}
            >
              <strong>Perfil</strong>
              <span>{user?.role || "user"}</span>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              {isAdmin && (
                <button
                  className="btnPrimary"
                  onClick={() => navigate("/admin/products")}
                  style={{ padding: "10px 14px" }}
                >
                  Gerenciar Produtos
                </button>
              )}

              <button
                onClick={() => {
                  logout();
                  navigate("/login", { replace: true });
                }}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* ADMIN: só painel */}
        {isAdmin ? (
          <div
            style={{
              marginTop: 18,
              background: "#fff",
              borderRadius: 16,
              padding: 22,
              border: "1px solid #eee",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Ações rápidas</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              <div style={cardMini}>
                <strong>Produtos</strong>
                <p style={{ opacity: 0.8, margin: "6px 0 10px" }}>
                  Criar, editar e remover produtos.
                </p>
                <button
                  className="btnPrimary"
                  onClick={() => navigate("/admin/products")}
                  style={{ padding: "10px 12px" }}
                >
                  Abrir Admin
                </button>
              </div>

              <div style={cardMini}>
                <strong>Pedidos</strong>
                <p style={{ opacity: 0.8, margin: "6px 0 10px" }}>
                  (Demo) Visualizar vendas.
                </p>
                <button
                  className="btnOutline"
                  onClick={() => alert("Demo: pedidos ainda não implementado")}
                  style={{ padding: "10px 12px" }}
                >
                  Ver pedidos
                </button>
              </div>

              <div style={cardMini}>
                <strong>Relatórios</strong>
                <p style={{ opacity: 0.8, margin: "6px 0 10px" }}>
                  (Demo) Estoque e performance.
                </p>
                <button
                  className="btnOutline"
                  onClick={() => alert("Demo: relatórios ainda não implementado")}
                  style={{ padding: "10px 12px" }}
                >
                  Ver relatórios
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* CLIENTE: Favoritos */}
            <div
              style={{
                marginTop: 18,
                background: "#fff",
                borderRadius: 16,
                padding: 22,
                border: "1px solid #eee",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2 style={{ margin: 0 }}>Favoritos</h2>
                <span
                  style={{
                    background: "#ff7a00",
                    color: "#fff",
                    padding: "6px 10px",
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {favorites.length}
                </span>
              </div>

              {favorites.length === 0 ? (
                <p style={{ marginTop: 10, opacity: 0.8 }}>
                  Você ainda não favoritou nenhum produto. Volte para a Home e
                  clique no ♡.
                </p>
              ) : (
                <div
                  style={{
                    marginTop: 12,
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(220px, 1fr))",
                    gap: 12,
                  }}
                >
                  {favorites.slice(0, 6).map((p) => (
                    <div
                      key={p.id}
                      style={{
                        border: "1px solid #eee",
                        borderRadius: 14,
                        overflow: "hidden",
                        display: "grid",
                        gridTemplateColumns: "120px 1fr",
                        background: "#fafafa",
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div style={{ padding: 12, display: "grid", gap: 6 }}>
                        <strong style={{ lineHeight: 1.2 }}>{p.title}</strong>
                        <span style={{ color: "#ff7a00", fontWeight: 800 }}>
                          {formatBRL(p.price)}
                        </span>
                        <button
                          onClick={() => navigate(`/products/${p.id}`)}
                          style={{
                            width: "fit-content",
                            padding: "8px 10px",
                            borderRadius: 10,
                            border: "1px solid #ddd",
                            background: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          Ver produto
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CLIENTE: Histórico */}
            <div
              style={{
                marginTop: 18,
                background: "#fff",
                borderRadius: 16,
                padding: 22,
                border: "1px solid #eee",
              }}
            >
              <h2 style={{ marginTop: 0 }}>Histórico de Compras</h2>

              {showOrders.length === 0 ? (
                <p style={{ opacity: 0.8 }}>
                  Nenhuma compra registrada ainda. (Para demo: aparece quando
                  você favoritar itens.)
                </p>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {showOrders.map((o) => (
                    <div
                      key={o.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 12,
                        border: "1px solid #eee",
                        borderRadius: 12,
                        background: "#fafafa",
                      }}
                    >
                      <div>
                        <strong>{o.id}</strong>
                        <div style={{ opacity: 0.8, fontSize: 13 }}>
                          {o.date}
                        </div>
                      </div>
                      <div style={{ fontWeight: 800 }}>
                        {formatBRL(o.total)}
                      </div>
                      <div style={{ opacity: 0.85 }}>{o.status}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
