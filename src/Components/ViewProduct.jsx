import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../formFields/InputField";
import styles from "../Css/Produtos.module.css";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: "",
    empresa: "",
    categoria: "",
    nivel: "",
    urlImagem: "",
    ingredientes: "",
    razaoPrejudicial: "",
  });

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/produtos/${id}`);
        const data = await response.json();
        setProduto(data);
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      }
    };

    fetchProduto();
  }, [id]);

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.ladoEsquerdo}>
          {produto.urlImagem ? (
            <img
              src={produto.urlImagem}
              alt={produto.nome}
              className={styles.produtoImagem}
            />
          ) : (
            <p>Sem imagem disponível</p>
          )}
        </div>

        <div className={styles.ladoDireito}>
          <InputField
            label="Nome do Produto"
            name="nome"
            value={produto.nome}
            readOnly={true} // Aqui desabilita edição
          />

          <InputField
            label="Empresa Responsável"
            name="empresa"
            value={produto.empresa?.nome || "Não especificada"}
            readOnly={true} // Aqui desabilita edição
          />

          <InputField
            label="Categoria"
            name="categoria"
            value={produto.categoria?.nome || "Não especificada"}
            readOnly={true} // Aqui desabilita edição
          />

          <InputField
            label="Nível do Produto"
            name="nivel"
            value={produto.nivel || "Indefinido"}
            readOnly={true} // Aqui desabilita edição
          />
        </div>
      </div>

      <section className={styles.areaTextos}>
        <div className={styles.campoTexto}>
          <h3>Ingredientes do Produto</h3>
          <p className={styles.texto}>{produto.ingredientes || "Não especificado"}</p>
        </div>
        <div className={styles.campoTexto}>
          <h3>Razão de Ser Prejudicial</h3>
          <p className={styles.texto}>{produto.razaoPrejudicial || "Não especificada"}</p>
        </div>
      </section>

      <div className={styles.botaoContainer}>
        <button
          className={styles.botaoCancelar}
          onClick={() => navigate("/listar-produtos")}
        >
          Voltar
        </button>
      </div>
    </>
  );
};

export default ViewProduct;
