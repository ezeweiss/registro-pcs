import React, {useState} from "react";
import { AppBar, Toolbar, Box, Button, Dialog, DialogTitle, IconButton, DialogContent, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import TablaIPNoUsadas from "../TablaIPNoUsadas/TablaIPNoUsadas";
import { ArrowDropDown, Close } from "@mui/icons-material";

const Navbar = ({equipos}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) =>  setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);


  return (
    <><AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box component={Link} to="/">
            <img
                src="src/assets/img/logo.png"
                alt="Logo"
                style={{height: 40}}
            />
        </Box>
        
        <Box>
          <Button color="inherit" component={Link} to='/'>Computadoras</Button>
          <Button color="inherit" component={Link} to='/telefonos'>Teléfonos</Button>
          <Button color="inherit" component={Link} to='/servidores'>Servidores</Button>
          <Button color="inherit" component={Link} to='/switchs'>Switchs</Button>
        </Box>
      </Toolbar>
    </AppBar>
  </>
  );
};

export default Navbar;
