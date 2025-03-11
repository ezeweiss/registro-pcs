import React, { useEffect, useState } from "react";
import { getEquipos, addEquipo, updateEquipo, deleteEquipo, getDirecciones, getMarcas } from "../../api/api";
import { Paper, Typography, Button, Grid} from "@mui/material";
import { Add } from "@mui/icons-material";
import { ordenarPorIp } from "../../api/ordenPorIP";
import Buscador from "../Buscador/Buscador";
import TablaEquipos from "../Tablas/TablaEquipos";
import FormEquipos from "../Forms/FormEquipos";
import TablaIPNoUsadas from "../TablaIPNoUsadas/TablaIPNoUsadas";

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [orderBy, setOrderBy] = useState("ip");
  const [order, setOrder] = useState("asc");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [newEquipo, setNewEquipo] = useState({
    host: "", ip: "", seriePc: "", serieMonitor: "",
    usuario: "", sector: "", direccion: "", marca: ""
  });
  const [errors, setErrors] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [showIpNoUsadas, setShowIpNoUsadas] = useState(false);
  const [equipoOriginal, setEquipoOriginal] = useState({});

  useEffect(() => {
    fetchEquipos();
    fetchDirecciones();
    fetchMarcas();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);
  


  const fetchEquipos = async () => {
    try {
      const data = await getEquipos();
      setEquipos(data);
    } catch (error) {
      console.error("Error al cargar los equipos", error);
    }
  };

  const fetchDirecciones = async () => {
    try {
      const data = await getDirecciones();
      setDirecciones(data.map(d => ({ id: d.id, nombre: d.direccion })));
    } catch (error) {
      console.error("Error al cargar las direcciones", error);
    }
  };
  
  const fetchMarcas = async () => {
    try {
      const data = await getMarcas();
      setMarcas(data.map(m => ({ id: m.id, nombre: m.marca })));
    } catch (error) {
      console.error("Error al cargar las marcas", error);
    }
  };

  const filteredEquipos = equipos.filter(equipo => {
    return (
      equipo.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipo.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipo.seriePc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipo.serieMonitor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipo.usuario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipo.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (equipo.direccion ? equipo.direccion.direccion.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
      (equipo.marca ? equipo.marca.marca.toLowerCase().includes(searchQuery.toLowerCase()) : false)
    );
  });


  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = orderBy === "ip" 
    ? ordenarPorIp(filteredEquipos, order)
    : [...filteredEquipos].sort((a, b) => {
        return order === "asc"
          ? String(a[orderBy]).localeCompare(String(b[orderBy]))
          : String(b[orderBy]).localeCompare(String(a[orderBy]));
    });

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 7));
    setPage(0);
  };

  const handleOpenAgregar = (equipo = null) => {
    if (equipo) {
      setEditMode(true);
      setCurrentId(equipo.id);
      setNewEquipo(equipo);
    } else {
      setEditMode(false);
      setCurrentId(null);
      setNewEquipo({
        host: "", ip: "", seriePc: "", serieMonitor: "",
        usuario: "", sector: "", direccion: "", marca: ""
      });
    }
    setErrors({});
    setOpen(true);
  };


  const handleOpenEditar = (equipo) => {
    setEditMode(true);
    setCurrentId(equipo.id);
    setEquipoOriginal(equipo);
    setNewEquipo({
      host: equipo.host,
      ip: equipo.ip,
      seriePc: equipo.seriePc,
      serieMonitor: equipo.serieMonitor,
      usuario: equipo.usuario,
      sector: equipo.sector,
      direccion: equipo.id_dir,
      marca: equipo.id_marca
    });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewEquipo({
      host: "", ip: "", seriePc: "", serieMonitor: "",
      usuario: "", sector: "", direccion: "", marca: ""
    });
    setErrors({});
  };
    
  const handleSave = async () => {
    const equipoAEnviar = {
      host: newEquipo.host,
      ip: newEquipo.ip,
      seriePc: newEquipo.seriePc,
      serieMonitor: newEquipo.serieMonitor,
      usuario: newEquipo.usuario,
      sector: newEquipo.sector,
      id_dir: Number(newEquipo.direccion), 
      id_marca: Number(newEquipo.marca), 
    };
  
    try {
      const isDuplicateHost = equipos.some(
        (equipo) => equipo.host === newEquipo.host && equipo.id !== currentId
      );
      const isDuplicateIp = equipos.some(
        (equipo) => equipo.ip === newEquipo.ip && equipo.id !== currentId
      );
  
      if (isDuplicateHost) {
        setErrors((prevErrors) => ({ ...prevErrors, host: "Este host ya está registrado." }));
        return;
      }
  
      if (isDuplicateIp) {
        setErrors((prevErrors) => ({ ...prevErrors, ip: "Esta IP ya está registrada." }));
        return;
      }
  
      if (editMode) {
        await updateEquipo(currentId, equipoAEnviar);
      } else {
        const newEquipoAdded = await addEquipo(equipoAEnviar);
        setEquipos((prevEquipos) => [newEquipoAdded, ...prevEquipos]);       
      }
  
      const totalEquipos = equipos.length + 1;
      const totalPages = Math.ceil(totalEquipos / rowsPerPage);
      if (page >= totalPages) {
        setPage(totalPages - 1);
      }
      handleClose();
      fetchEquipos();
    } catch (error) {
      console.error("❌ Error al guardar el equipo:", error);
    }
  };
  

  const handleDelete = async (id) => {
      try {
        await deleteEquipo(id);
        fetchEquipos();
      } catch (error) {
        console.error("Error al eliminar el equipo", error);
      }
  };

  const handleToggleIpNoUsadas = () => {
    setShowIpNoUsadas(!showIpNoUsadas);
  };

  const handleOpenTablaIpNoUsadas = () => {
    setShowIpNoUsadas(true);
  };

  const handleCloseDialog = () => {
    setShowIpNoUsadas(false);
  };


  return (
    <Paper sx={{ width: "95%", margin: "20px auto", padding: 2, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Lista de Computadoras
      </Typography>

      <Buscador searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => handleOpenAgregar()}>
            <Add />
          </Button>
        </Grid>


        <Grid item xs={6} sx={{ textAlign: "right" }}>
          <Button variant="contained" color="secondary" onClick={handleToggleIpNoUsadas}>
            Ver IPs Disponibles
          </Button>
        </Grid>
      </Grid>

      <TablaIPNoUsadas open={showIpNoUsadas} onClose={handleCloseDialog}/>
      
      <TablaEquipos
        equipos={sortedData}
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

      <FormEquipos
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        editMode={editMode}
        newEquipo={newEquipo}
        setNewEquipo={setNewEquipo}
        setEquipo={setNewEquipo}
        direcciones={direcciones}
        marcas={marcas}
        errors = {errors}
        setErrors = {setErrors}
        equipos = {equipos}
        equipoOriginal  = {equipoOriginal}
      />

    </Paper>
  );
};

export default Equipos;

