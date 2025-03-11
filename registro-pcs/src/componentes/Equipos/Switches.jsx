import React, { useEffect, useState } from "react";
import { getSwitches, addSwitch, updateSwitch, deleteSwitch } from "../../api/switches";
import { Paper, Typography, Button, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import Buscador from "../Buscador/Buscador";
import TablaSwitches from "../Tablas/TablaSwitches";
import FormSwitches from "../Forms/FormSwitches";
import { ordenarPorIp } from "../../api/ordenPorIP";

const Switches = () => {
  const [switches, setSwitches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [newSwitch, setNewSwitch] = useState({
    mac: "", ip: "", subred: "", usuario: "", clave: "", sector: "", marca: ""
  });
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [orderBy, setOrderBy] = useState("ip");
  const [order, setOrder] = useState("asc");
  const [switchOriginal, setSwitchOriginal] = useState({});

  useEffect(() => {
    fetchSwitches();
  }, []);

  const fetchSwitches = async () => {
    try {
      const data = await getSwitches();
      setSwitches(data);
    } catch (error) {
      console.error("Error al cargar los switches", error);
    }
  };

  const filteredSwitches = switches.filter(switchItem => {
    return (
      switchItem.mac.toLowerCase().includes(searchQuery.toLowerCase()) ||
      switchItem.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      switchItem.subred.toLowerCase().includes(searchQuery.toLowerCase()) ||
      switchItem.usuario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      switchItem.clave.toLowerCase().includes(searchQuery.toLowerCase()) ||
      switchItem.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      switchItem.marca.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = orderBy === "ip" 
    ? ordenarPorIp(filteredSwitches, order)
    : [...filteredSwitches].sort((a, b) => {
        return order === "asc"
          ? String(a[orderBy]).localeCompare(String(b[orderBy]))
          : String(b[orderBy]).localeCompare(String(a[orderBy]));
    });



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAgregar = () => {
    setEditMode(false);
    setCurrentId(null);
    setNewSwitch({
      mac: "", ip: "", subred: "", usuario: "", clave: "", sector: "", marca: ""
    });
    setErrors({});
    setOpen(true);
  };

  const handleOpenEditar = (switchItem) => {
    setEditMode(true);
    setCurrentId(switchItem.id);
    setSwitchOriginal(switchItem);
    setNewSwitch({
      mac: switchItem.mac,
      ip: switchItem.ip,
      subred: switchItem.subred,
      usuario: switchItem.usuario,
      clave: switchItem.clave,
      sector: switchItem.sector,
      marca: switchItem.marca
    });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewSwitch({
      mac: "", ip: "", subred: "", usuario: "", clave: "", sector: "", marca: ""
    });
    setErrors({});
  };

  const handleSave = async () => {
    try {
      const switchToSend = { ...newSwitch };    
      if (editMode) {
        await updateSwitch(currentId, switchToSend);
      } else {
        const addedSwitch = await addSwitch(switchToSend);
        setSwitches((prevSwitches) => [addedSwitch, ...prevSwitches]);
      }
      fetchSwitches();
      handleClose();
    } catch (error) {
      console.error("Error al guardar el switch", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSwitch(id);
      fetchSwitches();
    } catch (error) {
      console.error("Error al eliminar el switch", error);
    }
  };

  return (
    <Paper sx={{ width: "95%", margin: "20px auto", padding: 2, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Lista de Switches
      </Typography>

      <Buscador searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => handleOpenAgregar()}>
            <Add />
          </Button>
        </Grid>
      </Grid>

      <TablaSwitches
        switches={sortedData}
        orderBy={orderBy}
        order={order}
        handleSort={handleSort}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleOpenEditar={handleOpenEditar}
        handleDelete={handleDelete}
      />

      <FormSwitches
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        editMode={editMode}
        newSwitch={newSwitch}
        setNewSwitch={setNewSwitch}
        setSwitch={setNewSwitch}
        errors = {errors}
        setErrors = {setErrors}
        switches = {switches}
        switchOriginal  = {switchOriginal}
      />


    </Paper>
  );
};

export default Switches;
