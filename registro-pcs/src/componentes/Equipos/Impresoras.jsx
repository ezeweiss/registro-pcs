import React, { useEffect, useState } from "react";
import { getImpresoras, addImpresora, updateImpresora, deleteImpresora } from "../../api/impresoras";
import { Paper, Typography, Button, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import Buscador from "../Buscador/Buscador";
import TablaImpresoras from "../Tablas/TablaImpresoras";
import FormImpresoras from "../Forms/FormImpresoras";

const Impresoras = () => {
  const [impresoras, setImpresoras] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [orderBy, setOrderBy] = useState("ip");
  const [order, setOrder] = useState("asc");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [newImpresora, setNewImpresora] = useState({
    ip: "", nombre: "", sector: "", mac: "", numeroSerie: ""
  });
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [impresoraOriginal, setImpresoraOriginal] = useState({});

  useEffect(() => {
    fetchImpresoras();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [searchQuery, impresoras]);

  const fetchImpresoras = async () => {
    try {
      const data = await getImpresoras();
      setImpresoras(data);
    } catch (error) {
      console.error("Error al cargar las impresoras", error);
    }
  };

  const filteredImpresoras = impresoras.filter((impresora) => {
    return (
      (impresora.ip || "").includes(searchQuery) ||
      (impresora.nombre || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (impresora.sector || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (impresora.numeroSerie || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (impresora.mac || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleOpenAgregar = (impresora = null) => {
    if (impresora) {
      setEditMode(true);
      setCurrentId(impresora.id);
      setNewImpresora(impresora);
    } else {
      setEditMode(false);
      setCurrentId(null);
      setNewImpresora({ ip: "", nombre: "", sector: "", mac: "", numeroSerie: "" });
    }
    setErrors({});
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await updateImpresora(currentId, newImpresora);
      } else {
        const newImpresoraAdded = await addImpresora(newImpresora);
        setImpresoras(prevImpresoras => [newImpresoraAdded, ...prevImpresoras]);
      }
      handleClose();
      fetchImpresoras();
    } catch (error) {
      console.error("Error al guardar la impresora", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteImpresora(id);
      fetchImpresoras();
    } catch (error) {
      console.error("Error al eliminar la impresora", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNewImpresora({ ip: "", nombre: "", sector: "", mac: "", numeroSerie: "" });
    setErrors({});
  };

  return (
    <Paper sx={{ width: "95%", margin: "20px auto", padding: 2, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Lista de Impresoras
      </Typography>

      <Buscador searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => handleOpenAgregar()}>
            <Add />
          </Button>
        </Grid>
      </Grid>

      <TablaImpresoras
        impresoras={filteredImpresoras}
        orderBy={orderBy}
        order={order}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={setPage}
        handleOpenEditar={handleOpenAgregar}
        handleDelete={handleDelete}
      />

      <FormImpresoras
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        editMode={editMode}
        newImpresora={newImpresora}
        setNewImpresora={setNewImpresora}
        errors={errors}
        setErrors={setErrors}
        impresoraOriginal={impresoraOriginal}
        impresoras={impresoras}
      />
    </Paper>
  );
};

export default Impresoras;
