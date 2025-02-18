import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
            <img
                src="src/assets/img/logo.png"
                alt="Logo"
                style={{height: 40}}
            />
        </Box>
        
        <Box>
          <Button color="inherit">Computadoras</Button>
          <Button color="inherit">Teléfonos</Button>
          <Button color="inherit"></Button>
          <Button color="inherit"></Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
