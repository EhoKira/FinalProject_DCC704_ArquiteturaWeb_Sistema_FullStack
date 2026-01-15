import Header from "./Header";
import CategoryBar from "./CategoryBar";

export default function PublicLayout({ children }) {
  return (
    <div className="page">
      <Header />
      <CategoryBar />

      <main className="container" style={{ padding: "32px 0" }}>
        {children}
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
            <p>(00) 00000-0000</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
