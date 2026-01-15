import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";

export default function Contato() {
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
          <h1 style={{ marginTop: 0 }}>Contato</h1>
          <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
            Fale com a TechParts. (Demo) Esse formulário não envia de verdade,
            mas deixa a página pronta pro vídeo.
          </p>

          <div
            style={{
              marginTop: 16,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            <div style={box}>
              <strong>Email</strong>
              <p style={p}>contato@techparts.com</p>
              <strong>Telefone</strong>
              <p style={p}>(00) 00000-0000</p>
              <strong>Horário</strong>
              <p style={p}>Seg–Sex • 09:00–18:00</p>
            </div>

            <form
              style={{
                border: "1px solid #eee",
                borderRadius: 14,
                padding: 16,
                background: "#fafafa",
                display: "grid",
                gap: 10,
              }}
              onSubmit={(e) => {
                e.preventDefault();
                alert("Demo: mensagem enviada (fake) 😄");
              }}
            >
              <input placeholder="Seu nome" />
              <input placeholder="Seu email" />
              <textarea placeholder="Sua mensagem" rows={5} />
              <button className="btnPrimary" type="submit">
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

const box = {
  border: "1px solid #eee",
  borderRadius: 14,
  padding: 16,
  background: "#fafafa",
};

const p = { opacity: 0.85, margin: "6px 0 12px" };
