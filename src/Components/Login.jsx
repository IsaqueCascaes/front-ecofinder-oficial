import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from '../Css/Login.module.css';
import { useAuth } from '../auth/AuthContext'; // Importando o contexto de autenticação

const Login = () => {
  const [user_name, setUserName] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Obtém a função de login do contexto

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Faz login com os dados do usuário
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        user_name,
        senha,
      });

      if (response.status === 200) {
        console.log('Login bem-sucedido:', response.data);

        // Chama a função de login do contexto e armazena o token
        login(response.data.token);

        // Recupera a rota armazenada na query string "redirect"
        const redirectPath = new URLSearchParams(location.search).get('redirect');
        console.log('Redirecionando para:', redirectPath || '/listar-produtos');

        // Redireciona para a rota original ou para "/listar-produtos"
        navigate(redirectPath || '/listar-produtos');
      }
    } catch (err) {
      console.error('Erro no login:', err.response ? err.response.data : err.message);
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Login Admin</h2>
        <div className={styles.icon}></div>
        <form onSubmit={handleLogin}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Insira seu user"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Insira sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
        <p className={styles.link}>
          Não possui conta? <a href="/cadastro">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
