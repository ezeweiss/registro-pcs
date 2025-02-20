import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

const Buscador = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearClick = () => {
    setSearchQuery('');
  };

  return (
    <TextField
      label="Buscar"
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={handleSearchChange}
      sx={{ mb: 2 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {searchQuery && (
              <ClearIcon
                onClick={handleClearClick}
                sx={{ cursor: "pointer" }}
              />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Buscador;
