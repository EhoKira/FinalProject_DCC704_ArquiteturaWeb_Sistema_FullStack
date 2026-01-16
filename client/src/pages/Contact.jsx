import { useState } from "react";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import "../styles/contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setSent(true);

    // demo: não envia de verdade — só simula UX pro vídeo
    setTimeout(() => setSent(false), 2500);

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="page">
      <Header />
      <CategoryBar />

      <main className="container contactWrap">
        <section className="contactHero">
          <div className="contactHeroText">
            <span className="contactPill">Fale com a TechParts</span>
            <h1>Contato</h1>

            <div className="contactQuickGrid">
              <div className="quickCard">
                <span className="quickIcon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <p>contato@techparts.com</p>
                </div>
              </div>

              <div className="quickCard">
                <span className="quickIcon">📞</span>
                <div>
                  <strong>Telefone</strong>
                  <p>(00) 00000-0000</p>
                </div>
              </div>

              <div className="quickCard">
                <span className="quickIcon">🕒</span>
                <div>
                  <strong>Horário</strong>
                  <p>Seg–Sex • 09:00–18:00</p>
                </div>
              </div>

              <div className="quickCard">
                <span className="quickIcon">📍</span>
                <div>
                  <strong>Endereço</strong>
                  <p>Centro • (demo)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contactFormCard">
            <div className="contactFormTop">
              <h2>Enviar mensagem</h2>
              <span className="contactHint">Resposta em até 1 dia útil (demo)</span>
            </div>

            {sent && (
              <div className="contactToast">
                ✅ Mensagem “enviada” com sucesso (demo)!
              </div>
            )}

            <form onSubmit={onSubmit} className="contactForm">
              <label className="field">
                <span>Seu nome</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex.: Shelly"
                  required
                />
              </label>

              <label className="field">
                <span>Seu email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                  type="email"
                  required
                />
              </label>

              <label className="field">
                <span>Sua mensagem</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Conte como podemos ajudar..."
                  required
                />
              </label>

              <button type="submit" className="contactBtn">
                Enviar mensagem
              </button>

              <p className="contactSmall">
                Ao enviar, você concorda com nossa política de privacidade (demo).
              </p>
            </form>
          </div>
        </section>
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
