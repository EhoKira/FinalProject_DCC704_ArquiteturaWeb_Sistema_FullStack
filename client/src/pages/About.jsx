import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";

export default function Sobre() {
  return (
    <div className="page">
      <Header />
      <CategoryBar />

      <section className="container" style={{ padding: "26px 0 50px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 22,
            border: "1px solid #eee",
          }}
        >
          <h1 style={{ marginTop: 0 }}>Sobre a TechParts</h1>
          <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
            A TechParts é uma loja focada em hardware e periféricos, com curadoria
            de produtos para setups gamers, notebooks e upgrades para o dia a dia.
          </p>

          <div
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            <div style={card}>
              <strong>Entrega rápida</strong>
              <p style={p}>
                Processos otimizados para despachar pedidos com agilidade.
              </p>
            </div>
            <div style={card}>
              <strong>Suporte especializado</strong>
              <p style={p}>
                Atendimento para ajudar você a escolher o melhor componente.
              </p>
            </div>
            <div style={card}>
              <strong>Produtos selecionados</strong>
              <p style={p}>
                Catálogo enxuto com foco em qualidade e custo-benefício.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <h2>Missão</h2>
            <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
              Oferecer a melhor experiência de compra de tecnologia, com produtos
              confiáveis e um visual moderno inspirado em e-commerce profissional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const card = {
  border: "1px solid #eee",
  borderRadius: 14,
  padding: 16,
  background: "#fafafa",
};

const p = { opacity: 0.85, margin: "6px 0 0", lineHeight: 1.5 };
