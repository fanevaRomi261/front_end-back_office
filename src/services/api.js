// services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://voiturecloud-production-df74.up.railway.app/', // Remplacez par l'URL de votre backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
