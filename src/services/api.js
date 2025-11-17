import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Cambiar en producción

const api = axios.create({ baseURL: API_URL });

// Juegos
export const getJuegos = () => api.get('/juegos');
export const getJuego = (id) => api.get(`/juegos/${id}`);
export const createJuego = (data) => api.post('/juegos', data);
export const updateJuego = (id, data) => api.put(`/juegos/${id}`, data);
export const deleteJuego = (id) => api.delete(`/juegos/${id}`);

// Reseñas
export const getResenas = (juegoId) =>
    juegoId ? api.get(`/resenas?juegoId=${juegoId}`) : api.get('/resenas');
export const getResena = (id) => api.get(`/resenas/${id}`);
export const getResenasPorJuego = (juegoId) => api.get(`/resenas/juego/${juegoId}`);
export const createResena = (data) => api.post('/resenas', data);
export const updateResena = (id, data) => api.put(`/resenas/${id}`, data);
export const deleteResena = (id) => api.delete(`/resenas/${id}`);