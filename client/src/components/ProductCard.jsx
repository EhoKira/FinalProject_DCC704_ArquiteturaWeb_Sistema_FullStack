function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <div className="cardTop">
        <div className="stars">
          {"★".repeat(product.rating)} <span>({product.reviews})</span>
        </div>
        <button className="fav" title="Favoritar">♡</button>
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

        <button className="buyBtn">🛒 Comprar</button>
      </div>
    </div>
  );
}
