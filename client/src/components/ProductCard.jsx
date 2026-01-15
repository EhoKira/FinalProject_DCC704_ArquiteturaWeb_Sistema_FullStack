import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

function formatBRL(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFav } = useFavorites();

  // importante: garantir que é o id correto (no seu mapProductToCard deve virar product.id)
  const fav = isFav(product.id);

  function goToDetails() {
    navigate(`/products/${product.id}`);
  }

  function onToggleFav(e) {
    e.stopPropagation(); // não deixa clicar no card
    toggleFavorite(product);
  }

  function onBuy(e) {
    e.stopPropagation(); // não deixa clicar no card
    // por enquanto só vai para detalhes (ou você pode implementar carrinho depois)
    navigate(`/products/${product.id}`);
  }

  return (
    <div
      className="card"
      role="button"
      tabIndex={0}
      onClick={goToDetails}
      onKeyDown={(e) => {
        if (e.key === "Enter") goToDetails();
      }}
      style={{ cursor: "pointer" }}
    >
      <div className="cardTop">
        <div className="stars">
          {"★".repeat(product.rating)} <span>({product.reviews})</span>
        </div>

        <button
          type="button"
          className="fav"
          title={fav ? "Remover dos favoritos" : "Favoritar"}
          onClick={onToggleFav}
          style={{ fontWeight: 700 }}
        >
          {fav ? "♥" : "♡"}
        </button>
      </div>

      <div className="imgWrap">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="cardBody">
        <p className="title">{product.title}</p>

        <div className="discountRow">
          <span className="badge">{product.discount}</span>
        </div>

        <div className="priceRow">
          <span className="old">{formatBRL(product.oldPrice)}</span>
          <span className="price">{formatBRL(product.price)}</span>
        </div>

        <button type="button" className="buyBtn" onClick={onBuy}>
          🛒 Comprar
        </button>
      </div>
    </div>
  );
}
