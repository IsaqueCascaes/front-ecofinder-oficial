import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Importando o contexto de autenticação
import styles from "../Css/Navbar.module.css";
import api from "../auth/api";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Para detectar telas pequenas
  const { isAuthenticated, logout } = useAuth(); // Obtendo os valores do contexto
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define como "mobile" se a largura for <= 768px
    };

    handleResize(); // Executa ao carregar
    window.addEventListener("resize", handleResize); // Adiciona o listener para redimensionamento

    return () => {
      window.removeEventListener("resize", handleResize); // Remove o listener ao desmontar
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        searchTerm.trim() === ""
          ? "/produtos"
          : `/produtos/buscar?nome=${searchTerm}`;

      const response = await api.get(url);
      console.log("Dados retornados pela busca:", response.data);
      navigate("/listar-produtos", { state: { produtosFiltrados: response.data } });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error.response ? error.response.data : error.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); // Chamando a função de logout do contexto
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <a href="/home">EcoFinder</a>
      </div>

      {/* Formulário de pesquisa - aparece no centro apenas em telas grandes */}
      {!isMobile && (
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Procure seu produto"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Buscar
          </button>
        </form>
      )}

      {/* Botão do menu hambúrguer */}
      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>

      {/* Links do menu */}
      <div className={`${styles.navLinksContainer} ${menuOpen ? styles.active : ""}`}>
        <ul className={styles.navLinks}>
          <li>
            <a href="/home">Início</a>
          </li>
          <li>
            <a href="/listar-produtos">Produtos</a>
          </li>
          {isAuthenticated ? (
            <li>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Sair
              </button>
            </li>
          ) : (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>

        {/* Formulário dentro do menu em telas menores */}
        {menuOpen && isMobile && (
          <form onSubmit={handleSearchSubmit} className={styles.searchFormInMenu}>
            <input
              type="text"
              placeholder="Procure seu produto"
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInputInMenu}
            />
            <button type="submit" className={styles.searchButtonInMenu}>
              Buscar
            </button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
