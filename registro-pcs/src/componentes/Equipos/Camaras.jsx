import React, { useEffect, useState } from "react";
import {
  getCamaras,
  addCamara,
  updateCamara,
  deleteCamara,
  getMarcasCamaras
} from "../../api/camaras";
import { Paper, Typography, Button, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import Buscador from "../Buscador/Buscador";
import TablaCamaras from "../Tablas/TablaCamaras";
import FormCamaras from "../Forms/FormCamaras";

const Camaras = () => {
  const [camaras, setCamaras] = useState([]);
  const [page, setPage] = useState(0);
  const [marcasCamaras, setMarcasCamaras] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [orderBy, setOrderBy] = useState("ip");
  const [order, setOrder] = useState("asc");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [newCamara, setNewCamara] = useState({
    ip: "",
    nombre: "",
    sector: "",
    marcasCamaras: ""
  });
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCamaras();
    fetchMarcas();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);
  const fetchCamaras = async () => {
    try {
      const res = await getCamaras();
      console.log(res);
      setCamaras(res || []);
    } catch (error) {
      console.error("Error al cargar las cámaras", error);
    }
  };

  const fetchMarcas = async () => {
    try {
      const data = await getMarcasCamaras();
      setMarcasCamaras(data.map(m => ({ id: m.id, nombre: m.nombre })));
    } catch (error) {
      console.error("Error al cargar las marcas", error);
    }
  };
  
  const filteredCamaras = camaras
  .filter((camara) => {
    const marca = marcasCamaras.find(m => m.id === camara.id_cam_marc);
    const marcaNombre = marca ? marca.nombre.toLowerCase() : "";
    return (
      (camara.ip || "").includes(searchQuery) ||
      (camara.nombre || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (camara.sector || "").includes(searchQuery) ||
      marcaNombre.includes(searchQuery.toLowerCase())
    );
  })
  .slice(page * rowsPerPage, (page + 1) * rowsPerPage);


    const handleOpenAgregar = (camara = null) => {
      if (camara) {
        setEditMode(true);
        setCurrentId(camara.id);
        setNewCamara({
          ...camara,
          marcasCamaras: camara.id_cam_marc,
        });
      } else {
        setEditMode(false);
        setCurrentId(null);
        setNewCamara({ ip: "", nombre: "", sector: "", marcasCamaras: "" });
      }
      setErrors({});
      setOpen(true);
    };
    

  const handleSave = async () => {
    try {
      const camaraParaEnviar = {
        ip: newCamara.ip,
        nombre: newCamara.nombre,
        sector: newCamara.sector,
        id_cam_marc: Number(newCamara.marcasCamaras),
      };
  
      if (editMode) {
        await updateCamara(currentId, camaraParaEnviar);
      } else {
        await addCamara(camaraParaEnviar);
      }
  
      await fetchCamaras();
      handleClose();
    } catch (error) {
      console.error("Error al guardar la cámara", error);
    }
  };
  
  
  const handleDelete = async (id) => {
    try {
      await deleteCamara(id);
      fetchCamaras();
    } catch (error) {
      console.error("Error al eliminar la cámara", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNewCamara({ ip: "", nombre: "", sector: "", marcasCamaras: "" });
    setErrors({});
  };

  return (
    <Paper sx={{ width: "95%", margin: "20px auto", padding: 2, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Lista de Cámaras
      </Typography>

      <Buscador searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => handleOpenAgregar()}>
            <Add />
          </Button>
        </Grid>
      </Grid>

      <TablaCamaras
        camaras={filteredCamaras}
        orderBy={orderBy}
        order={order}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={setPage}
        handleOpenEditar={handleOpenAgregar}
        handleDelete={handleDelete}
      />

      <FormCamaras
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        editMode={editMode}
        newCamara={newCamara}
        setNewCamara={setNewCamara}
        errors={errors}
        setErrors={setErrors}
        camaras={camaras}
        marcasCamaras={marcasCamaras}
        camaraOriginal={editMode ? camaras.find(c => c.id === currentId) : null}
      />
    </Paper>
  );
};

export default Camaras;
