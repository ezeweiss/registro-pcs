import axios from "axios";

const API_URL = "http://localhost:5000/impresoras";

export const getImpresoras = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener impresoras:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addImpresora = async (impresoraData) => {
  try {
    const response = await axios.post(API_URL, impresoraData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al agregar impresora:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateImpresora = async (id, impresoraData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, impresoraData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar impresora:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteImpresora = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar impresora:", error.response ? error.response.data : error.message);
    throw error;
  }
};
