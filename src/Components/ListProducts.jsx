import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Css/ListProducts.module.css";
import { useAuth } from "../auth/AuthContext"; // Importando o contexto de autenticação
import api from "../auth/api";
const ListProducts = () => {
  // Estado para armazenar a lista de produtos
  const [produtos, setProdutos] = useState([]);

  // Hook para navegação programática
  const navigate = useNavigate();

  // Hook para acessar o estado da navegação (ex.: produtos filtrados)
  const location = useLocation();

  // Contexto de autenticação para verificar se o usuário está logado
  const { isAuthenticated } = useAuth();

  // useEffect para carregar produtos, verificando se há produtos filtrados pela busca
  useEffect(() => {
    if (location.state && location.state.produtosFiltrados) {
      setProdutos(location.state.produtosFiltrados);
    } else {
      fetchProdutos();
    }
  }, [location.state]);

  // Função para buscar todos os produtos do backend
  const fetchProdutos = async () => {
    try {
      const response = await api.get("/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar os produtos:", error);
    }
  };

  // Função para excluir um produto
  const deleteProduto = async (id) => {
    try {
      await api.delete(`/produtos/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
    }
  };

  // Função para redirecionar para a página de edição de um produto
  const editProduto = (id) => {
    navigate(`/editar-produto/${id}`);
  };

  // Função para redirecionar para a página de adicionar produto
  const addProduto = () => {
    navigate("/adicionar-produto");
  };

  return (
    <div className={styles.container}>
      {/* Exibe o botão "Adicionar Produto" apenas para usuários autenticados */}
      {isAuthenticated && (
        <button onClick={addProduto} className={styles.addButton}>
          Adicionar Produto
        </button>
      )}
      <h2>Produtos cadastrados</h2>

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado ainda.</p>
      ) : (
        produtos.map((produto) => (
          <div key={produto._id} className={styles.produtoCard}>
            {/* Exibe a imagem do produto, se disponível */}
            <img
              src={produto.urlImagem || "https://via.placeholder.com/150"}
              alt={produto.nome}
              className={styles.produtoImagem}
            />

            <div className={styles.produtoInfo}>
              <h3 onClick={() => navigate(`/produto/${produto._id}`)} className={styles.produtoNome}>{produto.nome}</h3>
              {/* Acessa nome da empresa e categoria de forma segura */}
              <p>Empresa: {produto.empresa?.nome || "Não especificada"}</p>
              <p>Categoria: {produto.categoria?.nome || "Não especificada"}</p>
              <p>Nível de Impacto: {produto.nivel || "Indefinido"}</p>
              <p>Ingredientes: {produto.ingredientes || "Não especificado"}</p>

              {/* Exibe os botões de ação apenas para usuários autenticados */}
              {isAuthenticated && (
                <div className={styles.actions}>
                  <button
                    onClick={() => editProduto(produto._id)}
                    className={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteProduto(produto._id)}
                    className={styles.deleteButton}
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListProducts;
