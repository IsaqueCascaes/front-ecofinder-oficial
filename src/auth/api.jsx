import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-ecofinder-oficial-1.onrender.com/api', // Substitua pelo domínio do Render
});

export default api;
