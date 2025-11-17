import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getJuegos = () => axios.get(`${API_URL}/juegos`);
export const createJuego = (data) => axios.post(`${API_URL}/juegos`, data);
// Faltan más: updateJuego, deleteJuego, getResenas, etc., basados en endpoints.