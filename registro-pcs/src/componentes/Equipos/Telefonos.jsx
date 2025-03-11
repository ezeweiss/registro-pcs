import React, { useEffect, useState } from "react";
import { getTelefonos, addTelefono, updateTelefono, deleteTelefono } from "../../api/telefonos";
import { Paper, Typography, Button, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import Buscador from "../Buscador/Buscador";
import TablaTelefonos from "../Tablas/TablaTelefonos";
import FormTelefonos from "../Forms/FormTelefonos";

const Telefonos = () => {
  const [telefonos, setTelefonos] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [orderBy, setOrderBy] = useState("ip");
  const [order, setOrder] = useState("asc");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [newTelefono, setNewTelefono] = useState({
    ip: "", interno: "", usuario: "", clave: "", sipUser: "", sipPassword: "", sector: "", numeroSerie: "", mac: ""
  });
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [telefonoOriginal, setTelefonoOriginal] = useState({});

  useEffect(() => {
    fetchTelefonos();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [searchQuery, telefonos]);

  const fetchTelefonos = async () => {
    try {
      const data = await getTelefonos();
      setTelefonos(data);
    } catch (error) {
      console.error("Error al cargar los teléfonos", error);
    }
  };

  const filteredTelefonos = telefonos.filter((telefono) => {
    return (
      (telefono.ip || "").includes(searchQuery) ||
      (telefono.interno || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (telefono.usuario || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (telefono.clave || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (telefono.sipUser || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (telefono.sipPassword || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (telefono.sector || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (telefono.numeroSerie || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (telefono.mac || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  

  const handleOpenAgregar = (telefono = null) => {
    if (telefono) {
      setEditMode(true);
      setCurrentId(telefono.id);
      setNewTelefono(telefono);
    } else {
      setEditMode(false);
      setCurrentId(null);
      setNewTelefono({ ip: "", interno: "", usuario: "", clave: "", sipUser: "", sipPassword: "", sector: "", numeroSerie: "", mac: "" });
    }
    setErrors({});
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await updateTelefono(currentId, newTelefono);
      } else {
        const newTelefonoAdded = await addTelefono(newTelefono);
        setTelefonos(prevTelefonos => [newTelefonoAdded, ...prevTelefonos]);
      }
      handleClose();
      fetchTelefonos();
    } catch (error) {
      console.error("Error al guardar el teléfono", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTelefono(id);
      fetchTelefonos();
    } catch (error) {
      console.error("Error al eliminar el teléfono", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNewTelefono({ ip: "", interno: "", usuario: "", clave: "", sipUser: "", sipPassword: "", sector: "", numeroSerie: "", mac: ""});
    setErrors({});
  };

  return (
    <Paper sx={{ width: "95%", margin: "20px auto", padding: 2, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Lista de Teléfonos
      </Typography>

      <Buscador searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => handleOpenAgregar()}>
            <Add />
          </Button>
        </Grid>
      </Grid>

      <TablaTelefonos
        telefonos={filteredTelefonos}
        orderBy={orderBy}
        order={order}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={setPage}
        handleOpenEditar={handleOpenAgregar}
        handleDelete={handleDelete}
      />

      <FormTelefonos
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        editMode={editMode}
        newTelefono={newTelefono}
        setNewTelefono={setNewTelefono}
        errors={errors}
        setErrors={setErrors}
        telefonoOriginal={telefonoOriginal}
        telefonos ={telefonos}      />
    </Paper>
  );
};

export default Telefonos;
