import axios from "axios";

const API_URL = "http://localhost:5000/switches";

export const getSwitches = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener switches:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addSwitch = async (switchData) => {
  try {
    console.log("📤 Enviando switch al backend:", JSON.stringify(switchData, null, 2));
    const response = await axios.post(API_URL, switchData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al agregar switch:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateSwitch = async (id, switchData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, switchData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar switch:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteSwitch = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar switch:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const obtenerSwitchConClave = async (id, clave) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      params: { clave },
    });

    if (response.status === 200) {
      console.log('Switch:', response.data);
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
