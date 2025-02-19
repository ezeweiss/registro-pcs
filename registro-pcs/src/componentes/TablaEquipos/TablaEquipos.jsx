import React, { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableSortLabel,
  IconButton,
  TablePagination
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import EliminarDialog from "../Dialog/EliminarDialog";
import { useNavigate } from "react-router-dom";

const TablaEquipos = ({
  equipos,
  orderBy,
  order,
  setOrderBy,
  handleOpenEditar,
  handleDelete,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [equipoAEliminar, setEquipoAEliminar] = useState(null);
  const navigate = useNavigate(); 
  const [currentPage, setCurrentPage] = useState(page);
  const [ipNoUsadas, setIpNoUsadas] = useState([]);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setCurrentPage(0);
    }
  }, [window.location.pathname]);

  const handleSort = (key) => {
    if (key === "ip") {
      setOrderBy(key);
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      if (orderBy === key) {
        setOrder(order === "asc" ? "desc" : "asc");
      } else {
        setOrderBy(key);
      }
    }
  };

  const sortedEquipos = [...equipos].sort((a, b) => {
    if (orderBy === "ip") {
      const ipA = a.ip.split('.').map(Number);
      const ipB = b.ip.split('.').map(Number);
      for (let i = 0; i < 4; i++) {
        if (ipA[i] < ipB[i]) return order === "asc" ? -1 : 1;
        if (ipA[i] > ipB[i]) return order === "asc" ? 1 : -1;
      }
      return 0;
    }

    return order === "asc"
      ? String(a[orderBy]).localeCompare(String(b[orderBy]))
      : String(b[orderBy]).localeCompare(String(a[orderBy]));
  });

  const equiposPaginaActual = sortedEquipos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  useEffect(() => {
    const generarRangoIPs = (inicio, fin) => {
      let ips = [];
      let partes = inicio.split('.').map(Number);
      let last = Number(fin.split('.')[3]);
  
      for (let i = partes[3]; i <= last; i++) {
        ips.push(`${partes[0]}.${partes[1]}.${partes[2]}.${i}`);
      }
  
      return ips;
    };
  
    const todasLasIps = generarRangoIPs("10.0.14.1", "10.0.14.255");
  
    const ipUsadas = equipos.map(e => e.ip);
    const disponibles = todasLasIps.filter(ip => !ipUsadas.includes(ip));
  
    setIpNoUsadas(disponibles);
  }, [equipos]);


  const abrirDialogoEliminar = (equipo) => {
    setEquipoAEliminar(equipo);
    setOpenDialog(true);
  };

  const cerrarDialogoEliminar = () => {
    setEquipoAEliminar(null);
    setOpenDialog(false);
  };

  const confirmarEliminacion = () => {
    if (equipoAEliminar) {
      handleDelete(equipoAEliminar.id);
    }
    cerrarDialogoEliminar();
  };

  return (
    <><TableContainer component={Paper} sx={{ maxHeight: "70vh", overflowY: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {["host", "ip", "seriePc", "serieMonitor", "usuario", "sector", "direccion", "marca"].map((key) => (
              <TableCell key={key} sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={orderBy === key}
                  direction={orderBy === key ? order : "asc"}
                  onClick={() => handleSort(key)}
                >
                  {key.toUpperCase()}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equiposPaginaActual.map((equipo) => (
            <TableRow key={equipo.id}>
              <TableCell>{equipo.host}</TableCell>
              <TableCell>{equipo.ip}</TableCell>
              <TableCell>{equipo.seriePc}</TableCell>
              <TableCell>{equipo.serieMonitor}</TableCell>
              <TableCell>{equipo.usuario}</TableCell>
              <TableCell>{equipo.sector}</TableCell>
              <TableCell>{equipo.direccion?.direccion}</TableCell>
              <TableCell>{equipo.marca?.marca}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleOpenEditar(equipo)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => abrirDialogoEliminar(equipo)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagina con números */}
      <TablePagination
        rowsPerPageOptions={[7]}
        component="div"
        count={equipos.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={(event, newPage) => {
          setCurrentPage(newPage);
          handleChangePage(event, newPage);
        } }
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
        siblingCount={1} />

      <EliminarDialog
        openDialog={openDialog}
        cerrarDialogoEliminar={cerrarDialogoEliminar}
        confirmarEliminacion={confirmarEliminacion} />
    </TableContainer>
</>
  );
};

export default TablaEquipos;
