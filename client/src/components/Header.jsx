import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // fecha com ESC
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // fecha se usuário deslogar em qualquer momento
  useEffect(() => {
    if (!isAuthenticated) setOpen(false);
  }, [isAuthenticated]);

  function onUserClick() {
    if (!isAuthenticated) return navigate("/login");
    setOpen((v) => !v);
  }

  function goProfile() {
    setOpen(false);
    navigate("/profile");
  }

  function goAdmin() {
    setOpen(false);
    navigate("/admin/products");
  }

  function doLogout() {
    setOpen(false);
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="header">
      <div className="container headerRow">
        <Link to="/" className="logo" style={{ textDecoration: "none" }}>
          <span className="logoMark">⚙️</span>
          <span className="logoText">TechParts</span>
        </Link>

        <div className="search">
          <input placeholder="Pesquisa" />
        </div>

        <nav className="topNav">
          <Link to="/">Home</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/contato">Contato</Link>
        </nav>

        <div className="icons">
          <button title="Favoritos" type="button">
            ♡
          </button>

          <button title="Carrinho" type="button">
            🛒
          </button>

          <div className="userMenu" ref={menuRef}>
            <button
              className="userBtn"
              onClick={onUserClick}
              title="Minha conta"
              type="button"
              aria-haspopup="menu"
              aria-expanded={open ? "true" : "false"}
            >
              <span className="userIcon">👤</span>
              <span className="userName">
                {isAuthenticated ? user?.name || "Conta" : "Entrar"}
              </span>
              <span className={`caret ${open ? "up" : ""}`}>▾</span>
            </button>

            {/* overlay para fechar clicando fora */}
            {open && (
              <button
                type="button"
                className="menuOverlay"
                aria-label="Fechar menu"
                onClick={() => setOpen(false)}
              />
            )}

            {isAuthenticated && (
              <div className={`userDropdown ${open ? "open" : ""}`}>
                <button type="button" onClick={goProfile}>
                  Meu perfil
                </button>

                {user?.role === "admin" && (
                  <button type="button" onClick={goAdmin}>
                    Área Admin
                  </button>
                )}

                <div className="dropdownDivider" />

                <button type="button" onClick={doLogout}>
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
