import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import Section from "../components/Section";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";

const mockOffers = [
  {
    id: 1,
    title: "Console PlayStation 5 Slim",
    price: 3347.07,
    oldPrice: 3650.2,
    discount: "15% OFF",
    rating: 5,
    reviews: 85,
    image:
      "https://images.unsplash.com/photo-1606813909355-86bbd8d8d00b?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    title: "SSD WD 1TB M.2 NVMe",
    price: 260.0,
    oldPrice: 360.0,
    discount: "15% OFF",
    rating: 5,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    title: "Suporte Articulado para Monitor",
    price: 339.99,
    oldPrice: 358.24,
    discount: "15% OFF",
    rating: 5,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    title: "Gabinete Gamer com RGB",
    price: 604.99,
    oldPrice: 632.49,
    discount: "15% OFF",
    rating: 5,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=700&q=80",
  },
];

const mockGaming = [
  {
    id: 5,
    title: "Headset Gamer Sem Fio",
    price: 389.99,
    oldPrice: 400.35,
    discount: "15% OFF",
    rating: 5,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    title: "Mouse Gamer",
    price: 177.59,
    oldPrice: 189.2,
    discount: "15% OFF",
    rating: 5,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    title: "Memória RAM 8GB",
    price: 260.0,
    oldPrice: 360.0,
    discount: "15% OFF",
    rating: 5,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1614064642306-8f5599d59efb?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    title: "Teclado Mecânico Gamer",
    price: 499.57,
    oldPrice: 665.2,
    discount: "15% OFF",
    rating: 5,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=700&q=80",
  },
];

export default function Home() {
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
        <Section title="Últimas Ofertas" actionText="Ver Tudo >">
          <div className="grid4">
            {mockOffers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>

        <Section title="Linha Gaming" actionText="Ver Tudo >">
          <div className="grid4">
            {mockGaming.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
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
