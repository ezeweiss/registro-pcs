import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        ¡Oops! Página no encontrada
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        La página que buscas no existe o fue movida.
      </Typography>
      <Box mt={3}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
