// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Substitua pelo endereço correto do back-end
});

export default api;
