import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

const Buscador = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearClick = () => {
    setSearchQuery('');
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", p: 2, pr: 5 }}>
      <TextField
        label="Buscar"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ width: 200, marginRight: "30px" }}
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
    </Box>
  );
};

export default Buscador;
