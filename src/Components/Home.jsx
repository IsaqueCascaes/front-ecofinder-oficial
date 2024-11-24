import styles from "../Css/Home.module.css";
import DynamicMain from "./DynamicMain";
import Instagram from "../assets/instagram.png";
import Facebook from "../assets/facebook.png";
import Linkedin from "../assets/linkedin.png";

const Home = () => {
  return (
    <div>
      <DynamicMain />

      {/* Conteúdo principal */}
      <section className={styles.sectionContainer}>
        <div className={styles.sectionCard}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNvKqvmKho99-qPR8x_8_uWvjixgkMJD_8Q&s"
            alt=""
          />
          <div>
            <h3>Consciência</h3>
            <p>
              A conscientização é essencial para promover mudanças positivas no
              mundo. Quando as pessoas compreendem o impacto de suas escolhas
              diárias, passam a agir com maior responsabilidade, adotando
              práticas que preservam o meio ambiente. O EcoFinder tem como
              objetivo educar os usuários sobre os produtos que utilizam,
              destacando o quanto cada item pode ser benéfico ou prejudicial ao
              planeta. Ao oferecer informações claras e acessíveis, buscamos
              incentivar escolhas mais conscientes, contribuindo para um futuro
              mais sustentável.
            </p>
          </div>
        </div>

        <div className={styles.sectionCard}>
          <div>
            <h3>Informar</h3>
            <p>
              O EcoFinder tem como objetivo educar a população, informando sobre
              os impactos ambientais dos produtos que utilizam diariamente. Ao
              mostrar as razões pelas quais certos produtos são prejudiciais ao
              meio ambiente, o site busca conscientizar os usuários sobre suas
              escolhas de consumo. Além disso, oferecemos alternativas menos
              poluentes, guiando os usuários para opções que minimizam danos e
              promovem um estilo de vida mais sustentável.
            </p>
          </div>
          <img
            src="https://media.istockphoto.com/id/928446078/vector/empty-notebook.jpg?s=612x612&w=0&k=20&c=yJw1BUdndkwySW9FWf8yYSgDbiqm7shJW_6rThm2pq8="
            alt=""
          />
        </div>
      </section>

      <section className={styles.sectionContainer}>
        <div className={styles.poluctionCard}>
          <div>
            <h2>Níveis de Poluição</h2>
            <p>
              Classificamos os produtos em quatro níveis de poluição, ajudando
              os usuários a entender o impacto ambiental de cada item. Essa
              classificação visa ajudar os usuários a fazer escolhas informadas,
              permitindo que eles identifiquem e evitem produtos que causam
              danos ao meio ambiente, ao mesmo tempo que promovem práticas de
              consumo mais responsáveis.
            </p>
          </div>

          <div className={styles.levelPolution}>
            <div className={styles.cardLevelPolution}>
              <h2>Ausente</h2>
              <p>
                Produtos que não causam impactos significativos ao meio
                ambiente. Eles são seguros para o uso e não contribuem para a
                degradação ambiental. Esses produtos são ideais para quem busca
                um consumo sustentável e consciente.
              </p>
            </div>
            <div className={styles.cardLevelPolution}>
              <h2>Leve</h2>
              <p>
                Produtos que possuem um impacto ambiental baixo. Eles podem
                gerar algum tipo de poluição ou consumir recursos naturais, mas
                em menor escala. Esses produtos são uma escolha razoável, mas
                ainda há margem para melhorias na sustentabilidade.
              </p>
            </div>
            <div className={styles.cardLevelPolution}>
              <h2>Moderado</h2>
              <p>
                Produtos com um impacto ambiental mais significativo. Eles podem
                contribuir para a poluição do ar, água, ou solo, e o seu uso
                frequente pode agravar problemas ambientais. Para quem se
                preocupa com o meio ambiente, é recomendável buscar alternativas
                mais ecológicas.
              </p>
            </div>
            <div className={styles.cardLevelPolution}>
              <h2>Crítico</h2>
              <p>
                Produtos altamente prejudiciais ao meio ambiente, causando danos
                graves e duradouros.Evitar esses produtos é essencial para a
                proteção dos ecossistemas e para promover um consumo mais
                responsável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nova seção com o vídeo */}
      <section className={styles.videoSection}>
        <h2>Saiba Mais Sobre o EcoFinder</h2>
        <p>
          Veja o vídeo abaixo para entender mais sobre nossa missão e impacto.
        </p>
        <div className={styles.videoContainer}>
          <iframe
            src="https://www.youtube.com/embed/GczpWuliW3s"
            title="EcoFinder - Saiba Mais"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.socialLinks}>
          {/* Ícones de redes sociais */}
          <div>
            <a href="https://www.instagram.com/" target="_blank">
              <img src={Instagram} alt="" />
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <img src={Facebook} alt="" />
            </a>
            <a href="https://www.linkedin.com" target="_blank">
              <img src={Linkedin} alt="" />
            </a>
          </div>
          <div className={styles.moreInfoContacts}>
            <p>Telefone: 91 985756609</p>
            <p>Email: ecofinder@gmail.com</p>
          </div>
        </div>

        <div className={styles.thankYouMessage}>
          <p>
            Obrigado por cuidar do nosso planeta. Volte sempre para continuar a
            mudança. Equipe EcoFinder
          </p>
        </div>

        <div className={styles.footerBottom}>EcoFinder - 2024</div>
      </footer>
    </div>
  );
};

export default Home;
