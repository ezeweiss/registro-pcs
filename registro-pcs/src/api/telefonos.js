import axios from "axios";

const API_URL = "http://localhost:5000/telefonos";

export const getTelefonos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener telefonos:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addTelefono = async (telefonoData) => {
  try {
    const response = await axios.post(API_URL, telefonoData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al agregar telefono:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateTelefono = async (id, telefonoData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, telefonoData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar telefono:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteTelefono = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar telefono:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const obtenerTelefonoConClave = async (id, clave) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      params: { clave },
    });

    if (response.status === 200) {
      console.log('telefono:', response.data);
      return response.data;
    } else {
      console.error('Error:', response.data.error);
      throw new Error(response.data.error);
    }
  } catch (error) {
    console.error('Error de conexión o autenticación:', error.message);
    throw error;
  }
};
