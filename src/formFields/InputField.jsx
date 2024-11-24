import styles from "../Css/Produtos.module.css"; // Importa o arquivo CSS para aplicar estilos ao componente

// Definição do componente funcional `InputField`
// Este componente recebe algumas props: `label`, `placeholder`, `value`, `onChange`, `name` e `type` (com valor padrão "text")
const InputField = ({ label, placeholder, value, onChange, name, type, readOnly = "text" }) => (
  <div className={styles.tarefa}> {/* Aplicando estilo à div de container através do CSS importado */}
    
    {/* Exibe o label do campo de input */}
    <h3>{label}</h3>
    
    {/* O campo de input em si */}
    <input
      type={type} // Define o tipo do input (por padrão é "text", mas pode ser passado como prop)
      name={name} // Define o atributo `name`, útil para formularios e para identificar o campo
      value={value} // O valor do input é controlado pelo prop `value`, vindo de fora
      onChange={onChange} // Função chamada sempre que o conteúdo do input mudar, também passada via prop
      placeholder={placeholder} // Define o placeholder para orientar o usuário
      readOnly={readOnly}
      className={styles.inputField} // Aplica uma classe CSS ao input para estilização
    />
  </div>
);

export default InputField; // Exporta o componente para ser usado em outros arquivos
