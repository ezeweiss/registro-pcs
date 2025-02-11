// Función para convertir una dirección IP a un número entero para la comparación
export const parseIpToInt = (ip) => {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
  };
  
  // Función para ordenar los datos por IP
  export const ordenarPorIp = (equipos, order = 'asc') => {
    return [...equipos].sort((a, b) => {
      return order === "asc"
        ? parseIpToInt(a.ip) - parseIpToInt(b.ip)
        : parseIpToInt(b.ip) - parseIpToInt(a.ip);
    });
  };
  