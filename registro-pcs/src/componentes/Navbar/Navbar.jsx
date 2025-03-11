import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({}) => {
  return (
    <><AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box component={Link} to="/">
            <img
                src="/logo.png"
                alt="Logo"
                style={{height: 40}}
            />
        </Box>
        
        <Box>
          <Button color="inherit" component={Link} to='/'>Computadoras</Button>
          <Button color="inherit" component={Link} to='/impresoras'>Impresoras</Button>
          <Button color="inherit" component={Link} to='/telefonos'>Teléfonos</Button>
          <Button color="inherit" component={Link} to='/servidores'>Servidores</Button>
          <Button color="inherit" component={Link} to='/switches'>Switches</Button>
        </Box>
      </Toolbar>
    </AppBar>
  </>
  );
};

export default Navbar;
