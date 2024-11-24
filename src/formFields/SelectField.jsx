import styles from "../Css/Produtos.module.css"; // Importa o CSS para aplicar estilos ao campo de seleção

// Componente funcional `SelectField`
// Recebe as props: `label`, `options`, `value`, e `onChange`
const SelectField = ({ label, options, value, onChange }) => {
  return (
    <div className={styles.tarefa}> {/* Aplica a classe CSS para estilizar o container */}
      
      {/* Renderiza o rótulo (label) do campo de seleção */}
      <h3>{label}</h3>
      
      {/* Campo de seleção (select), com o valor e o manipulador de mudança */}
      <select value={value} onChange={onChange} className={styles.inputField}>
        
        {/* Opção padrão para indicar que o usuário deve selecionar uma opção */}
        <option value="">Selecione uma opção</option>
        
        {/* Mapeia as opções passadas via props e renderiza cada uma como um elemento <option> */}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label} {/* O texto exibido da opção */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField; // Exporta o componente para ser utilizado em outros arquivos
