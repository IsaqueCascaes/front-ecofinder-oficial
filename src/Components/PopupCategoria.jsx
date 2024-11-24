import { useState, useEffect } from "react";
import styles from "../Css/Popup.module.css"; // Importa o CSS para estilizar o popup

const PopupCategoria = ({ isOpen, onClose, onSave, categoriaData }) => {
  // Estado para armazenar os dados da categoria
  const [categoria, setCategoria] = useState({ nome: "" });

  // useEffect é usado para carregar os dados da categoria se estivermos editando
  useEffect(() => {
    if (categoriaData) {
      setCategoria(categoriaData); // Se há dados de categoria (edição), preenche o formulário
    } else {
      setCategoria({ nome: "" }); // Caso contrário, limpa o campo (adição de nova categoria)
    }
  }, [categoriaData]);

  // Função chamada sempre que há uma mudança no input
  const handleChange = (e) => {
    const { name, value } = e.target; // Extrai o nome e valor do campo que foi alterado
    setCategoria((prev) => ({ ...prev, [name]: value })); // Atualiza o estado da categoria
  };

  // Função chamada ao salvar a categoria
  const handleSave = () => {
    // Verifica se o campo de nome da categoria foi preenchido
    if (!categoria.nome) {
      alert("Por favor, preencha o nome da categoria.");
      return;
    }
    onSave(categoria); // Chama a função onSave (passada via props) para salvar a categoria
    onClose(); // Fecha o popup após salvar
  };

  // Se o popup não está aberto, retorna null (não exibe o componente)
  if (!isOpen) return null;

  // Retorna o conteúdo do popup
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        {/* Botão para fechar o popup */}
        <button className={styles.popupClose} onClick={onClose}>
          X
        </button>

        {/* Título do popup, muda conforme se está editando ou adicionando */}
        <h2>{categoriaData ? "Editar Categoria" : "Adicionar Categoria"}</h2>

        {/* Campo de input para nome da categoria */}
        <div className={styles.sectionField}>
          <div className={styles.fieldContainer}>
            <input
              className={styles.inputField}
              type="text"
              name="nome"
              value={categoria.nome} // O valor do input é o nome da categoria
              onChange={handleChange} // Chama a função handleChange ao alterar o input
              placeholder="Nome da Categoria"
            />
          </div>
        </div>

        {/* Botão para salvar, muda o texto conforme se está editando ou adicionando */}
        <button className={styles.popupSave} onClick={handleSave}>
          {categoriaData ? "Salvar Alterações" : "Adicionar Categoria"}
        </button>
      </div>
    </div>
  );
};

export default PopupCategoria;
