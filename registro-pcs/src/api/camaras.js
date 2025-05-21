import axios from "axios";

const API_URL = "http://localhost:5000/camaras";
const MARCAS_URL = "http://localhost:5000/marcas-camaras";

export const getCamaras = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener cámaras:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addCamara = async (camaraData) => {
  try {
    const response = await axios.post(API_URL, camaraData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al agregar cámara:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateCamara = async (id, camaraData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, camaraData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar cámara:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteCamara = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar cámara:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getMarcasCamaras = async () => {
  try {
    const response = await axios.get(MARCAS_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener marcas:", error.response ? error.response.data : error.message);
    throw error;
  }
};