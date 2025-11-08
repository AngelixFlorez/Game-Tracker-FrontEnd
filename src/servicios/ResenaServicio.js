// src/services/ResenaService.js
import axios from 'axios';

// **¡IMPORTANTE!** Ajusta el puerto si tu backend no usa el 4000
const API_URL = 'http://localhost:4000/api/resenas'; 

// OBTENER RESEÑAS (Permite filtrar por juegoId para el detalle)
export const obtenerResenas = async (juegoId = null) => {
    try {
        // Si se proporciona juegoId, se añade a la query: /api/resenas?juegoId=...
        const url = juegoId ? `${API_URL}?juegoId=${juegoId}` : API_URL;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al obtener reseñas:", error);
        throw error;
    }
};

// AGREGAR NUEVA RESEÑA
export const crearResena = async (resenaData) => {
    try {
        const response = await axios.post(API_URL, resenaData);
        return response.data;
    } catch (error) {
        console.error("Error al crear reseña:", error);
        throw error.response ? error.response.data : error;
    }
};

// ACTUALIZAR RESEÑA
export const actualizarResena = async (id, resenaData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, resenaData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar reseña ${id}:`, error);
        throw error.response ? error.response.data : error;
    }
};

// ELIMINAR RESEÑA
export const eliminarResena = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar reseña ${id}:`, error);
        throw error;
    }
};