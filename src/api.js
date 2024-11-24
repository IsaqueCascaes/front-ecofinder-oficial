// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-ecofinder-oficial-1.onrender.com', // Substitua pelo endereço correto do back-end
});

export default api;
