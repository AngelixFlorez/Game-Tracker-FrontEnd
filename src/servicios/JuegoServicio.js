// src/services/JuegoService.js
import axios from 'axios';

// **¡IMPORTANTE!** Ajusta el puerto si tu backend no usa el 4000
const API_URL = 'http://localhost:3000/api/juegos'; 

// Carga de todos los juegos
export const obtenerJuegos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener juegos:", error);
        throw error;
    }
};

// Obtener un solo juego por ID
export const obtenerJuegoPorId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el juego ${id}:`, error);
        throw error;
    }
};

// Crear un nuevo juego
export const crearJuego = async (juegoData) => {
    try {
        const response = await axios.post(API_URL, juegoData);
        return response.data;
    } catch (error) {
        console.error("Error al crear juego:", error);
        throw error.response ? error.response.data : error; 
    }
};

// Actualizar un juego
export const actualizarJuego = async (id, juegoData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, juegoData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el juego ${id}:`, error);
        throw error.response ? error.response.data : error;
    }
};

// Eliminar un juego
export const eliminarJuego = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar el juego ${id}:`, error);
        throw error;
    }
};