import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import "../styles/about.css";

export default function About() {
  return (
    <div className="page">
      <Header />
      <CategoryBar />

      <main className="container aboutWrap">
        <section className="aboutHero">
          <div className="aboutHeroText">
            <span className="aboutPill">TechParts • Loja de Tecnologia</span>
            <h1>Sobre a TechParts</h1>
            <p>
              A TechParts é uma loja focada em hardware e periféricos, com curadoria
              de produtos para setups gamer, notebooks e upgrades para o dia a dia.
              Nosso objetivo é entregar uma experiência de compra moderna, rápida e confiável.
            </p>

            <div className="aboutHeroStats">
              <div className="stat">
                <strong>+1.2k</strong>
                <span>clientes (demo)</span>
              </div>
              <div className="stat">
                <strong>24h</strong>
                <span>despacho (demo)</span>
              </div>
              <div className="stat">
                <strong>4.9★</strong>
                <span>avaliação (demo)</span>
              </div>
            </div>
          </div>

          <div className="aboutHeroCard">
            <div className="aboutHeroCardTop">
              <span className="aboutBadge">Curadoria</span>
              <span className="aboutBadge alt">Garantia</span>
            </div>

            <h3>O que você encontra aqui</h3>
            <ul className="aboutList">
              <li>Notebooks, PCs e componentes</li>
              <li>Periféricos para produtividade e jogos</li>
              <li>Monitores, upgrades e acessórios</li>
              <li>Atendimento e suporte (demo)</li>
            </ul>

            <div className="aboutHeroCardBottom">
              <div className="trustItem">
                <span className="trustIcon">🔒</span>
                <div>
                  <strong>Segurança</strong>
                  <p>Login + token JWT</p>
                </div>
              </div>

              <div className="trustItem">
                <span className="trustIcon">⚙️</span>
                <div>
                  <strong>Admin</strong>
                  <p>CRUD de produtos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="aboutGrid">
          <div className="aboutInfoCard">
            <h3>Entrega rápida</h3>
            <p>Processos otimizados para despachar pedidos com agilidade.</p>
            <div className="aboutMini">
              <span>• Postagem em até 24h (demo)</span>
              <span>• Rastreamento do pedido (demo)</span>
            </div>
          </div>

          <div className="aboutInfoCard">
            <h3>Suporte especializado</h3>
            <p>Atendimento para ajudar você a escolher o melhor componente.</p>
            <div className="aboutMini">
              <span>• Dúvidas e compatibilidade</span>
              <span>• Recomendações por uso</span>
            </div>
          </div>

          <div className="aboutInfoCard">
            <h3>Produtos selecionados</h3>
            <p>Catálogo com foco em qualidade e custo-benefício.</p>
            <div className="aboutMini">
              <span>• Marcas conhecidas</span>
              <span>• Estoque e preço atualizados</span>
            </div>
          </div>
        </section>

        <section className="aboutTwoCols">
          <div className="aboutPanel">
            <h2>Missão</h2>
            <p>
              Oferecer a melhor experiência de compra de tecnologia, com produtos
              confiáveis e um visual moderno inspirado em e-commerce profissional.
            </p>

            <div className="aboutDivider" />

            <h2>Valores</h2>
            <div className="aboutChips">
              <span className="chip">Transparência</span>
              <span className="chip">Qualidade</span>
              <span className="chip">Agilidade</span>
              <span className="chip">Segurança</span>
              <span className="chip">Suporte</span>
            </div>
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
            <p>(95) 99155-0733</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
