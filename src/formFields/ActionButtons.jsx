import styles from "../Css/Produtos.module.css"; // Importa o arquivo CSS para aplicar estilos aos botões

// Componente funcional `ActionButtons`
// Recebe duas props: `onAddClick` e `onEditClick`, que são funções chamadas quando os botões são clicados
const ActionButtons = ({ onAddClick, onEditClick }) => (
  <div className={styles.botoesAcao}> {/* Aplica a classe CSS para estilizar o container dos botões */}
    
    {/* Botão "Adicionar", que chama a função `onAddClick` quando clicado */}
    <button className={styles.botaoAcao} onClick={onAddClick}>
      Adicionar
    </button>
    
    {/* Botão "Editar", que chama a função `onEditClick` quando clicado */}
    <button className={styles.botaoAcao} onClick={onEditClick}>
      Editar
    </button>
    
  </div>
);

export default ActionButtons; // Exporta o componente para ser utilizado em outros arquivos
