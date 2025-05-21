import axios from "axios";


const API_URL = "http://localhost:5000/equipos";
const DIRECCIONES_URL = "http://localhost:5000/direcciones";
const MARCAS_URL = "http://localhost:5000/marcas"; 


export const getEquipos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener equipos:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const getDirecciones = async () => {
  try {
    const response = await axios.get(DIRECCIONES_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener direcciones:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const getMarcas = async () => {
  try {
    const response = await axios.get(MARCAS_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener marcas:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const addEquipo = async (equipo) => {
  try {
    const response = await axios.post(API_URL, equipo);
    return response.data;
  } catch (error) {
    console.error("❌ Error al agregar equipo:", error.response ? error.response.data : error.message);
    throw error;
  }
};



export const updateEquipo = async (id, equipo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, equipo);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar equipo:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const deleteEquipo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar equipo:", error.response ? error.response.data : error.message);
    throw error;
  }
};
