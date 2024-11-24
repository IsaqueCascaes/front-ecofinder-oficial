import { useState, useEffect } from "react";
import styles from "../Css/Popup.module.css"; // Importa os estilos para o popup

const Popup = ({ isOpen, onClose, onSave, empresaData }) => {
  // Estado para armazenar os dados da empresa
  const [empresa, setEmpresa] = useState({ nome: "", nota: "", descricao: "" });

  // useEffect é usado para carregar os dados da empresa se estivermos editando
  useEffect(() => {
    if (empresaData) {
      setEmpresa(empresaData); // Se há dados de empresa (edição), preenche o formulário
    } else {
      setEmpresa({ nome: "", nota: "", descricao: "" }); // Caso contrário, limpa o campo (adição de nova empresa)
    }
  }, [empresaData]);

  // Função chamada sempre que há uma mudança nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target; // Extrai o nome e valor do campo que foi alterado
    setEmpresa((prev) => ({ ...prev, [name]: value })); // Atualiza o estado da empresa
  };

  // Função chamada ao salvar a empresa
  const handleSave = () => {
    console.log('empresa enviada para o onSave:', empresa)
    // Verifica se todos os campos foram preenchidos
    if (!empresa.nome || !empresa.nota || !empresa.descricao) {
      alert("Por favor, preencha todos os campos."); // Alerta caso algum campo esteja vazio
      return;
    }
  
    // Inclui o `_id` da empresa (caso seja uma edição)
    if (empresaData && empresaData._id) {
      onSave({ ...empresa, _id: empresaData._id }); // Passa o `_id` para o onSave
    } else {
      onSave(empresa); // Adiciona uma nova empresa (sem `_id`)
    }
  
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
        <h2>{empresaData ? "Editar Empresa" : "Adicionar Empresa"}</h2>

        {/* Campos de input para o nome e nota da empresa */}
        <div className={styles.sectionField}>
          {/* Input para o nome da empresa */}
          <div className={styles.fieldContainer}>
            <input
              className={styles.inputField}
              type="text"
              name="nome"
              value={empresa.nome} // O valor do input é o nome da empresa
              onChange={handleChange} // Chama a função handleChange ao alterar o input
              placeholder="Nome da Empresa"
            />
          </div>

          {/* Input para a nota da empresa (número entre 0 e 10) */}
          <div className={styles.fieldContainer}>
            <input
              className={styles.inputField}
              type="number"
              name="nota"
              value={empresa.nota} // O valor do input é a nota da empresa
              onChange={handleChange} // Chama a função handleChange ao alterar o input
              placeholder="Nota da Empresa"
              min="0"
              max="5" // Limita a nota entre 0 e 10
            />
          </div>
        </div>

        {/* Campo de textarea para a descrição da empresa */}
        <div className={styles.descricaoSection}>
          <textarea
            className={styles.textareaField}
            name="descricao"
            value={empresa.descricao} // O valor do textarea é a descrição da empresa
            onChange={handleChange} // Chama a função handleChange ao alterar o textarea
            placeholder="Descrição da Empresa"
          ></textarea>
        </div>

        {/* Botão para salvar as informações da empresa */}
        <button className={styles.popupSave} onClick={handleSave}>
          {empresaData ? "Salvar Alterações" : "Adicionar Empresa"}
        </button>
      </div>
    </div>
  );
};

export default Popup;
