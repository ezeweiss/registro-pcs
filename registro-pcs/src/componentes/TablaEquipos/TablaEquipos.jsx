import React from "react";
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
  TablePagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import EliminarDialog from "../Dialog/EliminarDialog";


const TablaEquipos = ({ equipos, orderBy, order, setOrderBy, handleOpenEditar, handleDelete, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  
  const [openDialog, setOpenDialog] = useState(false);
  const [equipoAEliminar, setEquipoAEliminar] = useState(null);
  
  const equiposPaginaActual = equipos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  const handleSort = (key) => {
    if (orderBy === key) {
      setOrderBy(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(key);
    }
  };

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
    <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflowY: "auto" }}>
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

      <TablePagination
        rowsPerPageOptions={[7]}
        component="div"
        count={equipos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <EliminarDialog
        openDialog={openDialog}
        cerrarDialogoEliminar={cerrarDialogoEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />

    </TableContainer>
  );
};

export default TablaEquipos;
