import React, { useEffect, useState } from "react";
import { getEquipos, addEquipo, updateEquipo, deleteEquipo, getDirecciones, getMarcas } from "../../api/api"; // Importa las funciones de la API
import {
  Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper,
  TablePagination, TableSortLabel, Typography, TextField, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, IconButton, Box, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { ordenarPorIp } from "../../../ordenPorIP";
import CustomSelect from "../../CustomSelect";
import Buscador from "../Buscador/Buscador";

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
    setRowsPerPage(parseInt(event.target.value, 10));
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

  // Validación de campos vacíos
  const validateForm = () => {
    let newErrors = {};
    Object.keys(newEquipo).forEach((key) => {
      const value = newEquipo[key];
      
      // Verificar si el valor es una cadena antes de aplicar .trim()
      if (typeof value === 'string' && !value.trim()) {
        newErrors[key] = "Este campo es obligatorio";
      } else if (value == null || value === "") {
        newErrors[key] = "Este campo es obligatorio";
      }
    });
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  
  const handleSave = async () => {
    const equipoAEnviar = {
      host: newEquipo.host,
      ip: newEquipo.ip,
      seriePc: newEquipo.seriePc,
      serieMonitor: newEquipo.serieMonitor,
      usuario: newEquipo.usuario,
      sector: newEquipo.sector,
      id_dir: Number(newEquipo.direccion),  // Asumiendo que es un número
      id_marca: Number(newEquipo.marca),   // Asumiendo que es un número
    };
  
    try {
      if (editMode) {
        // Si estamos en modo edición, enviamos una solicitud PUT
        await updateEquipo(currentId, equipoAEnviar); // Usa el ID del equipo actual
      } else {
        // Si no estamos en modo edición, enviamos una solicitud POST para agregar
        await addEquipo(equipoAEnviar);
      }
      handleClose();  // Cerrar el modal
      window.location.reload();  // Recargar la página
    } catch (error) {
      console.error("❌ Error al guardar el equipo:", error);
    }
  };
  
  
  
  

  // Eliminar equipo
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este equipo?")) {
      try {
        await deleteEquipo(id);
        fetchEquipos(); // Recargar lista
      } catch (error) {
        console.error("Error al eliminar el equipo", error);
      }
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
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[{ key: "host", label: "Nombre" },
                { key: "ip", label: "IP" },
                { key: "seriePC", label: "N° Serie PC" },
                { key: "serieMonitor", label: "N° Serie Monitor" },
                { key: "usuario", label: "Persona" },
                { key: "sector", label: "Sector" },
                { key: "direccion", label: "Dirección" },
                { key: "marca", label: "Marca PC" }
              ].map((column) => (
                <TableCell key={column.key} sx={{ fontWeight: "bold" }}>
                  <TableSortLabel
                    active={orderBy === column.key}
                    direction={orderBy === column.key ? order : "asc"}
                    onClick={() => handleSort(column.key)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((equipo) => (
                <TableRow key={equipo.id} hover>
                  <TableCell>{equipo.host}</TableCell>
                  <TableCell>{equipo.ip}</TableCell>
                  <TableCell>{equipo.seriePc}</TableCell>
                  <TableCell>{equipo.serieMonitor}</TableCell>
                  <TableCell>{equipo.usuario}</TableCell>
                  <TableCell>{equipo.sector}</TableCell>
                  <TableCell>{equipo.direccion ? equipo.direccion.direccion : 'No disponible'}</TableCell>
                  <TableCell>{equipo.marca ? equipo.marca.marca: 'No Disponible'}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenEditar(equipo)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(equipo.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={equipos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Editar PC" : "Agregar Nueva PC"}</DialogTitle>
        <DialogContent>
          {Object.keys(newEquipo)
            .filter(field => field !== "id")
            .map((field) => (
              <Box key={field} sx={{ mb: 2 }}>
                {field === "direccion" || field === "marca" ? (
            // En Equipos.jsx, dentro de handleOpen (o donde uses CustomSelect):
            <CustomSelect
            label={field === "direccion" ? "Dirección" : "Marca"}
            value={newEquipo[field] || ""}  // Asegurarse de que no sea undefined
            onChange={(newValue) => setNewEquipo({ ...newEquipo, [field]: Number(newValue) })} // Convertir a número
            options={field === "direccion" ? direcciones : marcas}
          />
          

          
          ) : (
            <TextField
              label={field}
              fullWidth
              value={newEquipo[field] || ""}
              onChange={(e) => setNewEquipo({ ...newEquipo, [field]: e.target.value })}
              error={!!errors[field]}
              helperText={errors[field] || ""}
            />
          )}

              </Box>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancelar</Button>
          <Button onClick={handleSave} color="primary" variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>

    </Paper>
  );
};

export default Equipos;