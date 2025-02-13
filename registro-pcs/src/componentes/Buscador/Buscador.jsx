import React from "react";
import { TextField } from "@mui/material";

const Buscador = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <TextField
      label="Buscar"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={handleSearchChange}
      sx={{ mb: 2 }}
    />
  );
};

export default Buscador;
