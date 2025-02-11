import axios from "axios";

const API_URL = "http://localhost:5000"; // Dirección de tu servidor Express

// Función para obtener los equipos
export const getEquipos = async () => {
  try {
    const response = await axios.get(`${API_URL}/equipos`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los equipos", error);
    throw error;
  }
};

// Función para agregar un equipo
export const addEquipo = async (equipo) => {
  try {
    const response = await axios.post(`${API_URL}/equipos`, equipo);
    return response.data;
  } catch (error) {
    console.error("Error al agregar el equipo", error);
    throw error;
  }
};

// Función para actualizar un equipo
export const updateEquipo = async (id, equipo) => {
  try {
    const response = await axios.put(`${API_URL}/equipos/${id}`, equipo);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el equipo", error);
    throw error;
  }
};

// Función para eliminar un equipo
export const deleteEquipo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/equipos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el equipo", error);
    throw error;
  }
};
