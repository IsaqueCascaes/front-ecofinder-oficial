import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../formFields/InputField";
import SelectField from "../formFields/SelectField";
import ActionButtons from "../formFields/ActionButtons";
import Popup from "./Popup";
import PopupCategoria from "./PopupCategoria";
import ImageUploadByUrl from "./ImageUploadByUrl";
import styles from "../Css/Produtos.module.css";
import "../Css/Popup.module.css";
import api from "../auth/api";

export const ProductForm = () => {
  const [empresas, setEmpresas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedEmpresaId, setSelectedEmpresaId] = useState("");
  const [selectedCategoriaId, setSelectedCategoriaId] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isCategoriaPopupOpen, setCategoriaPopupOpen] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [nome, setNome] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [razaoPrejudicial, setRazaoPrejudicial] = useState("");
  const [urlImagem, setUrlImagem] = useState("");

  const navigate = useNavigate();

  // 1. Fetch empresas e categorias do backend
  useEffect(() => {
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

    fetchEmpresas();
    fetchCategorias();
  }, []);

  const togglePopup = (popupType, isOpen, item = null) => {
    if (popupType === "empresa") {
      setEmpresaSelecionada(item);
      setPopupOpen(isOpen);
    } else if (popupType === "categoria") {
      setCategoriaSelecionada(item);
      setCategoriaPopupOpen(isOpen);
    }
  };

  // 2. Função para salvar ou editar uma empresa
  const handleSaveEmpresa = async (novaEmpresa) => {
    console.log("Empresa recebida no handleSaveEmpresa:", novaEmpresa);
    try {
      if (novaEmpresa._id) {
        // Caso o `_id` exista, é uma edição
        const response = await api.put(
          `/empresas/${novaEmpresa._id}`,
          novaEmpresa
        );
        setEmpresas((prevEmpresas) =>
          prevEmpresas.map((empresa) =>
            empresa._id === novaEmpresa._id ? response.data : empresa
          )
        );
      } else {
        // Caso contrário, é uma adição
        const response = await api.post(
          "/empresas",
          novaEmpresa
        );
        setEmpresas([...empresas, response.data]); // Adiciona a nova empresa à lista
      }

      setPopupOpen(false); // Fecha o popup após salvar
    } catch (error) {
      console.error("Erro ao salvar a empresa:", error);
    }
  };

  // 3. Função para salvar ou editar uma categoria
  const handleSaveCategoria = async (novaCategoria) => {
    try {
      if (categoriaSelecionada) {
        // Editando uma categoria
        const response = await api.put(
          `/categorias/${categoriaSelecionada._id}`,
          novaCategoria
        );
        setCategorias((prevCategorias) =>
          prevCategorias.map((categoria) =>
            categoria._id === categoriaSelecionada._id
              ? response.data
              : categoria
          )
        );
      } else {
        // Adicionando uma nova categoria
        const response = await api.post(
          "/categorias",
          novaCategoria
        );
        setCategorias([...categorias, response.data]); // Adiciona a nova categoria à lista
      }
      setCategoriaPopupOpen(false); // Fecha o popup após salvar
    } catch (error) {
      console.error("Erro ao salvar a categoria:", error);
    }
  };

  // 4. Função que é chamada ao submeter o formulário
  const handleSubmit = async () => {
    // Verificar se os campos obrigatórios estão preenchidos
    if (!nome || !selectedEmpresaId || !selectedCategoriaId) {
      alert(
        "Por favor, preencha o nome, empresa e Categoria do produto para Publicar."
      );
      return;
    }

    const produto = {
      nome,
      empresa: selectedEmpresaId,
      categoria: selectedCategoriaId,
      nivel: "Ausente",
      urlImagem,
      ingredientes,
      razaoPrejudicial,
    };

    console.log("Produto a ser enviado:", produto); // Verificação dos dados antes de enviar

    try {
      const response = await api.post(
        "/produtos",
        produto
      );
      console.log("Produto adicionado com sucesso:", response.data);
      navigate("/listar-produtos");
    } catch (error) {
      console.error(
        "Erro ao adicionar produto:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.ladoEsquerdo}>
          <ImageUploadByUrl setUrlImagem={setUrlImagem} />
        </div>

        <div className={styles.ladoDireito}>
          <InputField
            label="Nome do produto"
            placeholder="Adicione o nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            readOnly={false}
          />

          <SelectField
            label="Empresa responsável"
            options={empresas.map((empresa) => ({
              label: empresa.nome,
              value: empresa._id,
            }))}
            defaultText="Selecione a empresa"
            value={selectedEmpresaId}
            onChange={(e) => setSelectedEmpresaId(e.target.value)}
          />

          <ActionButtons
            onAddClick={() => togglePopup("empresa", true)}
            onEditClick={() => {
              const empresa = empresas.find((e) => e._id === selectedEmpresaId);
              if (empresa) togglePopup("empresa", true, empresa);
            }}
          />

          <SelectField
            label="Categoria do produto"
            options={categorias.map((categoria) => ({
              label: categoria.nome,
              value: categoria._id,
            }))}
            defaultText="Selecione a categoria"
            value={selectedCategoriaId}
            onChange={(e) => setSelectedCategoriaId(e.target.value)}
          />

          <ActionButtons
            onAddClick={() => togglePopup("categoria", true)}
            onEditClick={() => {
              const categoria = categorias.find(
                (c) => c._id === selectedCategoriaId
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
            defaultText="Selecione o nível do produto"
            onChange={(e) => console.log("Nivel selecionado:", e.target.value)}
          />
        </div>
      </div>

      <section className={styles.areaTextos}>
        <div className={styles.campoTexto}>
          <h3>Ingredientes do Produto</h3>
          <textarea
            className={styles.textareaProduto}
            placeholder="Adicione aqui, os ingredientes do produto"
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.campoTexto}>
          <h3>Razão de Ser Prejudicial</h3>
          <textarea
            className={styles.textareaRazao}
            placeholder="Adicione aqui, o motivo do produto ser prejudicial para o meio ambiente"
            value={razaoPrejudicial}
            onChange={(e) => setRazaoPrejudicial(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.botaoContainer}>
          <button className={styles.botaoPublicar} onClick={handleSubmit}>
            Publicar
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
        onSave={handleSaveEmpresa} // Integra a lógica de salvamento de empresas
        empresaData={empresaSelecionada} // Passa os dados da empresa selecionada para edição
      />

      <PopupCategoria
        isOpen={isCategoriaPopupOpen}
        onClose={() => togglePopup("categoria", false)}
        onSave={handleSaveCategoria} // Integra a lógica de salvamento de categorias
        categoriaData={categoriaSelecionada}
      />
    </>
  );
};

export default ProductForm;
