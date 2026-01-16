import "../styles/header.css"; // ✅ GARANTE que o CSS do header carrega

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logoImg from "../assets/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function onUserClick() {
    if (!isAuthenticated) return navigate("/login");
    setOpen((v) => !v);
  }

  function goProfile() {
    navigate("/profile");
    setOpen(false);
  }

  function goAdmin() {
    navigate("/admin/products");
    setOpen(false);
  }

  function doLogout() {
    logout();
    setOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <header className="header">
      <div className="container headerRow">
        <Link to="/" className="logo" aria-label="TechParts - Home">
          <img className="logoImg" src={logoImg} alt="TechParts" />
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
          <button title="Favoritos" type="button">♡</button>
          <button title="Carrinho" type="button">🛒</button>

          <div className="userMenu" ref={menuRef}>
            <button className="userBtn" onClick={onUserClick} type="button">
              <span className="userIcon">👤</span>
              <span className="userName">
                {isAuthenticated ? user?.name || "Conta" : "Entrar"}
              </span>
              <span className={`caret ${open ? "up" : ""}`}>▾</span>
            </button>

            {isAuthenticated && open && (
              <>
                <button
                  className="menuOverlay"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  type="button"
                />

                <div className="userDropdown open">
                  <button type="button" onClick={goProfile}>Meu perfil</button>

                  {user?.role === "admin" && (
                    <button type="button" onClick={goAdmin}>Área Admin</button>
                  )}

                  <div className="dropdownDivider" />

                  <button type="button" onClick={doLogout}>Sair</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
