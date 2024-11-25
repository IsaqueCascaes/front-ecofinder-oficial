import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegação
import styles from "../Css/Login.module.css"; // Reutilizando o mesmo estilo de Login para consistência visual
import api from "../auth/api";

const Cadastro = () => {
  // Definindo estados para armazenar o nome de usuário, senha e se o usuário é administrador
  const [user_name, setUserName] = useState("");
  const [senha, setSenha] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Estado booleano para indicar se o usuário é administrador
  const [error, setError] = useState(""); // Estado para armazenar possíveis mensagens de erro
  const [success, setSuccess] = useState(""); // Estado para armazenar mensagens de sucesso
  const navigate = useNavigate(); // Hook para redirecionar o usuário após o cadastro

  // Função para lidar com o envio do formulário de cadastro
  const handleRegister = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página

    const validationErrors = []; // Array para acumular mensagens de erro

    // Validação do nome de usuário
    if (user_name.length < 5) {
      validationErrors.push(
        "O nome de usuário deve ter pelo menos 5 caracteres."
      );
    }

    // Validação da senha
    if (senha.length < 8) {
      validationErrors.push("A senha deve ter pelo menos 8 caracteres.");
    }

    // Exibe os erros e encerra a função se houver mensagens
    if (validationErrors.length > 0) {
      setError(validationErrors); // Atualiza o estado com o array de erros
      return;
    }

    try {
      // Enviando uma requisição POST para o backend com os dados do novo usuário
      const response = await api.post(
        "/auth/register",
        {
          user_name,
          senha,
          isAdmin,
        }
      );

      // Se o cadastro for bem-sucedido (status 201), exibe uma mensagem de sucesso e redireciona para a página de login
      if (response.status === 201) {
        setSuccess("Usuário cadastrado com sucesso!");
        navigate("/login"); // Redireciona para a página de login após o cadastro
      }
    } catch (err) {
      // Caso ocorra um erro no cadastro, exibe uma mensagem de erro
      setError("Erro ao cadastrar usuário. Tente novamente.", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Cadastro Admin</h2> {/* Título da página */}
        <div className={styles.icon}></div> {/* Espaço para um ícone */}
        {/* Formulário de cadastro */}
        <form onSubmit={handleRegister}>
          {/* Campo para o nome de usuário */}
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Insira seu user" // Placeholder para ajudar o usuário a saber o que inserir
              value={user_name} // O valor do campo é controlado pelo estado user_name
              onChange={(e) => setUserName(e.target.value)} // Atualiza o estado user_name conforme o usuário digita
              required // Campo obrigatório
            />
          </div>

          {/* Campo para a senha */}
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Insira sua senha" // Placeholder para senha
              value={senha} // O valor do campo é controlado pelo estado senha
              onChange={(e) => setSenha(e.target.value)} // Atualiza o estado senha conforme o usuário digita
              required // Campo obrigatório
            />
          </div>

          {/* Checkbox para indicar se o usuário é administrador */}
          <div className={styles.checkboxContainer}>
            <label>
              <input
                type="checkbox" // Campo do tipo checkbox
                checked={isAdmin} // O valor é controlado pelo estado isAdmin
                onChange={(e) => setIsAdmin(e.target.checked)} // Atualiza o estado isAdmin quando o checkbox é marcado ou desmarcado
              />
              Administrador
            </label>
          </div>

          {/* Exibe a mensagem de erro se houver um erro */}
          {error.length > 0 && (
            <ul className={styles.errorList}>
              {error.map((error, index) => (
                <li key={index} className={styles.errorItem}>
                  {error}
                </li>
              ))}
            </ul>
          )}

          {/* Exibe a mensagem de sucesso se o cadastro for bem-sucedido */}
          {success && <p className={styles.success}>{success}</p>}

          {/* Botão de envio do formulário */}
          <button type="submit" className={styles.button}>
            Cadastrar
          </button>
        </form>
        {/* Link para redirecionar para a página de login se o usuário já tiver uma conta */}
        <p className={styles.link}>
          Já possui conta? <a href="/login">Entre</a>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
