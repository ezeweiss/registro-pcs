import axios from "axios";

// URL de tu servidor backend
const API_URL = "http://localhost:5000/equipos";
const DIRECCIONES_URL = "http://localhost:5000/direcciones"; // Suponiendo que esta sea la URL para direcciones
const MARCAS_URL = "http://localhost:5000/marcas"; // Suponiendo que esta sea la URL para marcas

// Obtener todos los equipos
export const getEquipos = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Respuesta de la API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener equipos:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Obtener todas las direcciones
export const getDirecciones = async () => {
  try {
    const response = await axios.get(DIRECCIONES_URL);
    console.log("Respuesta de direcciones:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener direcciones:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Obtener todas las marcas
export const getMarcas = async () => {
  try {
    const response = await axios.get(MARCAS_URL);
    console.log("Respuesta de marcas:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener marcas:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Agregar un nuevo equipo
export const addEquipo = async (equipo) => {
  try {
    const response = await axios.post(API_URL, equipo);
    return response.data;
  } catch (error) {
    console.error("Error al agregar equipo:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Actualizar un equipo
export const updateEquipo = async (id, equipo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, equipo);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar equipo:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Eliminar un equipo
export const deleteEquipo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar equipo:", error.response ? error.response.data : error.message);
    throw error;
  }
};
