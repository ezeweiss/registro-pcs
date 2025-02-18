// ordenarPorIp.js
export const ordenarPorIp = (data, order) => {
  return data.sort((a, b) => {
    const ipA = a.ip.split('.').map(Number);
    const ipB = b.ip.split('.').map(Number);
    for (let i = 0; i < 4; i++) {
      if (ipA[i] < ipB[i]) return order === "asc" ? -1 : 1;
      if (ipA[i] > ipB[i]) return order === "asc" ? 1 : -1;
    }
    return 0;
  });
};
