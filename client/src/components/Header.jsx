export default function Header() {
  return (
    <header className="header">
      <div className="container headerRow">
        <div className="logo">
          <span className="logoMark">⚙️</span>
          <span className="logoText">TechParts</span>
        </div>

        <div className="search">
          <input placeholder="Pesquisa" />
        </div>

        <nav className="topNav">
          <a href="#">Home</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </nav>

        <div className="icons">
          <button title="Favoritos">♡</button>
          <button title="Carrinho">🛒</button>
          <button title="Conta">👤</button>
        </div>
      </div>
    </header>
  );
}
