import React, { useEffect, useState } from "react";
import { getEquipos, addEquipo, updateEquipo, deleteEquipo, getDirecciones, getMarcas } from "../../api/api"; // Importa las funciones de la API
import { Paper, Typography, Button} from "@mui/material";
import { Add } from "@mui/icons-material";
import { ordenarPorIp } from "../../api/ordenPorIP";
import Buscador from "../Buscador/Buscador";
import TablaEquipos from "../TablaEquipos/TablaEquipos";
import FormEquipos from "../FormEquipos/FormEquipos";

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

  const [searchQuery, setSearchQuery] = useState("");  // Estado para el filtro de búsqueda

  useEffect(() => {
    fetchEquipos();
    fetchDirecciones();
    fetchMarcas();
  }, []);


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
      setDirecciones(data.map(d => ({ id: d.id, nombre: d.direccion }))); // Asegura que la estructura es correcta
    } catch (error) {
      console.error("Error al cargar las direcciones", error);
    }
  };
  
  const fetchMarcas = async () => {
    try {
      const data = await getMarcas();
      setMarcas(data.map(m => ({ id: m.id, nombre: m.marca }))); // Asegura que la estructura es correcta
    } catch (error) {
      console.error("Error al cargar las marcas", error);
    }
  };

  // Filtro por texto
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


  // Ordenar la tabla
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Ordenación personalizada por IP
  const sortedData = orderBy === "ip" 
    ? ordenarPorIp(filteredEquipos, order)
    : [...filteredEquipos].sort((a, b) => {
        return order === "asc"
          ? String(a[orderBy]).localeCompare(String(b[orderBy]))
          : String(b[orderBy]).localeCompare(String(a[orderBy]));
    });

  // Paginación
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 7));
    setPage(0);
  };

  // Abrir modal para agregar o editar
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
    setEditMode(true);  // Estamos en modo de edición
    setCurrentId(equipo.id);  // Establecemos el ID del equipo que se va a editar
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
    setErrors({});  // Reseteamos los errores
    setOpen(true);  // Abrimos el formulario
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


  return (
    <Paper sx={{ width: "95%", margin: "20px auto", padding: 2, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Lista de Computadoras
      </Typography>

      <Buscador searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Button variant="contained" color="primary" onClick={() => handleOpenAgregar()} sx={{ mb: 2 }}>
        <Add />
      </Button>
      
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
      />

    </Paper>
  );
};

export default Equipos;

