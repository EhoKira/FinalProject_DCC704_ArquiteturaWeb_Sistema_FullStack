import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import { api } from "../services/api";
import { useFavorites } from "../contexts/FavoritesContext";
import "../styles/productDetails.css";

function formatBRL(value) {
  const n = Number(value || 0);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProductDetails() {
  const { id } = useParams();
  const { toggleFavorite, isFav } = useFavorites();

  const [product, setProduct] = useState(null); // produto do backend (schema)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // mock visual
  const rating = useMemo(() => 5, []);
  const reviews = useMemo(() => 65, []);
  const oldPrice = useMemo(() => {
    if (!product?.price) return 0;
    return Number(product.price) * 1.15;
  }, [product?.price]);

  // transforma o produto do backend no formato do favorito/card
  const cardProduct = useMemo(() => {
    if (!product) return null;
    return {
      id: product._id || product.id,
      title: product.name,
      price: Number(product.price || 0),
      oldPrice: Number(oldPrice || 0),
      discount: "15% OFF",
      rating,
      reviews,
      image: product.imageUrl,
    };
  }, [product, oldPrice, rating, reviews]);

  const favorited = isFav(product?._id || product?.id);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Erro ao carregar o produto.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function onFavorite() {
    if (!cardProduct) return;
    toggleFavorite(cardProduct);
  }

  return (
    <div className="page">
      <Header />
      <CategoryBar />

      <main className="container pdWrap">
        <div className="pdBreadcrumb">
          <Link to="/" className="pdLink">
            Home
          </Link>
          <span className="pdSep">›</span>
          <span className="pdMuted">Detalhes</span>
        </div>

        {loading && (
          <div className="pdCard">
            <p className="pdMuted">Carregando produto...</p>
          </div>
        )}

        {!loading && error && (
          <div className="pdCard">
            <h2>Ops 😕</h2>
            <p className="pdError">{error}</p>
            <Link to="/" className="btnOutline">
              Voltar para Home
            </Link>
          </div>
        )}

        {!loading && !error && product && (
          <div className="pdGrid">
            {/* imagem */}
            <div className="pdImageCard">
              <img className="pdImage" src={product.imageUrl} alt={product.name} />
            </div>

            {/* infos */}
            <div className="pdInfo">
              <h1 className="pdTitle">{product.name}</h1>

              <div className="pdStars">
                {"★".repeat(rating)} <span className="pdMuted">({reviews})</span>
              </div>

              <p className="pdDesc">{product.description}</p>

              <div className="pdPrices">
                <span className="pdOld">{formatBRL(oldPrice)}</span>
                <span className="pdPrice">{formatBRL(product.price)}</span>
                <span className="pdBadge">15% OFF</span>
              </div>

              <div className="pdMeta">
                <div>
                  <strong>Categoria:</strong>{" "}
                  <span className="pdMuted">{product.category}</span>
                </div>
                <div>
                  <strong>Estoque:</strong>{" "}
                  <span className={product.stock > 0 ? "pdStockOk" : "pdStockNo"}>
                    {product.stock > 0 ? `${product.stock} disponível` : "Sem estoque"}
                  </span>
                </div>
              </div>

              <div className="pdActions">
                <button className="btnPrimary" disabled={product.stock <= 0}>
                  🛒 Adicionar ao carrinho
                </button>

                <button
                  className="btnOutline"
                  title={favorited ? "Remover dos favoritos" : "Favoritar"}
                  onClick={onFavorite}
                  style={{
                    fontWeight: 800,
                    borderColor: favorited ? "#ffd6d6" : undefined,
                    background: favorited ? "#fff5f5" : undefined,
                  }}
                >
                  {favorited ? "♥ Favoritado" : "♡ Favoritar"}
                </button>
              </div>

              {product?.createdBy?.name && (
                <p className="pdCreatedBy">
                  <span className="pdMuted">Cadastrado por:</span>{" "}
                  <strong>{product.createdBy.name}</strong>
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container footerGrid">
          <div>
            <strong>TechParts</strong>
            <p>Loja de hardware e periféricos.</p>
          </div>
          <div>
            <strong>Suporte</strong>
            <p>Rastrear pedido</p>
            <p>Política de entrega</p>
          </div>
          <div>
            <strong>Contato</strong>
            <p>contato@techparts.com</p>
            <p>(95) 99155-4759</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
