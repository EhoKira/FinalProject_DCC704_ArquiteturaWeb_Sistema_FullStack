import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { mapProductToCard } from "../utils/mapProductToCard";

import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import Section from "../components/Section";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setErrorMsg("");

        // Seu baseURL já é http://localhost:5000/api
        // então aqui fica /products
        const res = await api.get("/products");

        if (!isMounted) return;

        // Garantir array
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(data);
      } catch (err) {
        if (!isMounted) return;

        console.error(err);
        setErrorMsg("Não foi possível carregar os produtos do backend.");
        setProducts([]);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Converte do formato do backend para o formato do ProductCard
  const cardProducts = useMemo(() => {
    return products.map(mapProductToCard);
  }, [products]);

  // Seções (ajusta como você quiser)
  const offers = cardProducts.slice(0, 4);
  const gaming = cardProducts.slice(4, 8);

  return (
    <div className="page">
      <Header />
      <CategoryBar />

      {/* HERO */}
      <section className="hero">
        <div className="container heroGrid">
          <div className="heroText">
            <h1>
              A Melhor loja de <br /> componentes do mercado
            </h1>
            <p>Hardware de Alto Desempenho | Setups Gamer | Notebooks</p>
            <button className="btnPrimary">Compre agora</button>
          </div>

          <div className="heroImageWrap">
            <img
              className="heroImage"
              src="https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=1200&q=80"
              alt="PC Gamer"
            />
          </div>
        </div>
      </section>

      {/* OFERTAS */}
      <section className="container">
        {errorMsg ? (
          <div style={{ padding: 12, marginTop: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            <strong>Erro:</strong> {errorMsg}
          </div>
        ) : null}

        <Section title="Últimas Ofertas" actionText="Ver Tudo >">
          <div className="grid4">
            {loading ? (
              <p style={{ padding: 12 }}>Carregando produtos...</p>
            ) : offers.length === 0 ? (
              <p style={{ padding: 12 }}>Nenhum produto encontrado.</p>
            ) : (
              offers.map((p) => <ProductCard key={p.id} product={p} />)
            )}
          </div>
        </Section>

        <Section title="Linha Gaming" actionText="Ver Tudo >">
          <div className="grid4">
            {loading ? (
              <p style={{ padding: 12 }}>Carregando produtos...</p>
            ) : gaming.length === 0 ? (
              <p style={{ padding: 12 }}>Sem produtos nesta seção.</p>
            ) : (
              gaming.map((p) => <ProductCard key={p.id} product={p} />)
            )}
          </div>
        </Section>

        {/* BANNERS “POPULARES / MARCAS” */}
        <div className="brandsRow">
          <div className="brandCard light">
            <h3>Produtos Populares</h3>
            <p>Descubra os itens mais vendidos da semana.</p>
            <button className="btnOutline">Comprar agora</button>
          </div>

          <div className="brandCard">
            <h3>Logitech</h3>
            <p>Periféricos e acessórios para produtividade.</p>
            <button className="btnOutline">Comprar agora</button>
          </div>

          <div className="brandCard dark">
            <h3>Razer</h3>
            <p>Performance gamer com estilo.</p>
            <button className="btnOutline darkBtn">Comprar agora</button>
          </div>

          <div className="brandCard darkest">
            <h3>Dell</h3>
            <p>Notebooks e monitores para o dia a dia.</p>
            <button className="btnOutline darkBtn">Comprar agora</button>
          </div>
        </div>
      </section>

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
