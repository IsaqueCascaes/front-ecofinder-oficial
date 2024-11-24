import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../formFields/InputField";
import SelectField from "../formFields/SelectField";
import ActionButtons from "../formFields/ActionButtons";
import Popup from "./Popup";
import PopupCategoria from "./PopupCategoria";
import ImageUploadByUrl from "./ImageUploadByUrl";
import styles from "../Css/Produtos.module.css";
import api from "../auth/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado do produto e listas de empresas/categorias
  const [produto, setProduto] = useState({
    nome: "",
    empresa: "",
    categoria: "",
    nivel: "",
    urlImagem: "",
    ingredientes: "",
    razaoPrejudicial: "",
  });
  const [empresas, setEmpresas] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isCategoriaPopupOpen, setCategoriaPopupOpen] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  // Função para buscar os dados do produto pelo ID
  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        const produtoData = response.data;
    
        // Atualiza o estado do produto
        setProduto({
          ...produtoData,
          empresa: produtoData.empresa?._id || "", // Armazena apenas o _id da empresa
          categoria: produtoData.categoria?._id || "", // Armazena apenas o _id da categoria
        });
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      }
    };

    const fetchEmpresas = async () => {
      try {
        const response = await api.get("/empresas");
        setEmpresas(response.data);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await api.get(
          "/categorias"
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchProduto();
    fetchEmpresas();
    fetchCategorias();
  }, [id]);

  const handleChange = (e) => {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
    });
  };

  // Função para salvar as alterações
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/produtos/${id}`, produto);
      navigate("/listar-produtos");
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
    }
  };

  const togglePopup = (popupType, isOpen, item = null) => {
    if (popupType === "empresa") {
      setEmpresaSelecionada(item);
      setPopupOpen(isOpen);
    } else if (popupType === "categoria") {
      setCategoriaSelecionada(item);
      setCategoriaPopupOpen(isOpen);
    }
  };

  // Funções para salvar nova empresa ou categoria
  const handleSaveEmpresa = (novaEmpresa) => {
    setEmpresas([...empresas, novaEmpresa]);
    setPopupOpen(false);
  };

  const handleSaveCategoria = (novaCategoria) => {
    setCategorias([...categorias, novaCategoria]);
    setCategoriaPopupOpen(false);
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.ladoEsquerdo}>
          <ImageUploadByUrl
            urlImagem={produto.urlImagem} // Passa a URL existente para o componente
            setUrlImagem={(url) => setProduto({ ...produto, urlImagem: url })} // Atualiza o estado do produto
          />
        </div>

        <div className={styles.ladoDireito}>
          <InputField
            label="Nome do Produto"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            placeholder="Nome do produto"
            readOnly={false}
          />

          <SelectField
            label="Empresa responsável"
            options={empresas.map((empresa) => ({
              label: empresa.nome,
              value: empresa._id,
            }))}
            value={produto.empresa}
            onChange={(e) =>
              setProduto({ ...produto, empresa: e.target.value })
            }
          />
          <ActionButtons
            onAddClick={() => togglePopup("empresa", true)}
            onEditClick={() => {
              const empresa = empresas.find((e) => e._id === produto.empresa);
              if (empresa) togglePopup("empresa", true, empresa);
            }}
          />

          <SelectField
            label="Categoria do produto"
            options={categorias.map((categoria) => ({
              label: categoria.nome,
              value: categoria._id,
            }))}
            value={produto.categoria}
            onChange={(e) =>
              setProduto({ ...produto, categoria: e.target.value })
            }
          />
          <ActionButtons
            onAddClick={() => togglePopup("categoria", true)}
            onEditClick={() => {
              const categoria = categorias.find(
                (c) => c._id === produto.categoria
              );
              if (categoria) togglePopup("categoria", true, categoria);
            }}
          />

          <SelectField
            label="Nível do produto"
            options={["Ausente", "Leve", "Moderado", "Crítico"].map(
              (nivel) => ({
                label: nivel,
                value: nivel,
              })
            )}
            value={produto.nivel}
            onChange={(e) => setProduto({ ...produto, nivel: e.target.value })}
          />
        </div>
      </div>

      <section className={styles.areaTextos}>
        <div className={styles.campoTexto}>
          <h3>Ingredientes do Produto</h3>
          <textarea
            className={styles.textareaProduto}
            name="ingredientes"
            placeholder="Adicione aqui os ingredientes do produto"
            value={produto.ingredientes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.campoTexto}>
          <h3>Razão de Ser Prejudicial</h3>
          <textarea
            className={styles.textareaRazao}
            name="razaoPrejudicial"
            placeholder="Adicione o motivo do produto ser prejudicial"
            value={produto.razaoPrejudicial}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={styles.botaoContainer}>
          <button
            type="submit"
            onClick={handleSave}
            className={styles.botaoPublicar}
          >
            Salvar Alterações
          </button>
          <button
            className={styles.botaoCancelar}
            onClick={() => navigate("/listar-produtos")}
          >
            Cancelar
          </button>
        </div>
      </section>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => togglePopup("empresa", false)}
        onSave={handleSaveEmpresa}
        empresaData={empresaSelecionada}
      />

      <PopupCategoria
        isOpen={isCategoriaPopupOpen}
        onClose={() => togglePopup("categoria", false)}
        onSave={handleSaveCategoria}
        categoriaData={categoriaSelecionada}
      />
    </>
  );
};

export default EditProduct;
