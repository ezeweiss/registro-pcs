import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import EliminarDialog from "../Dialog/EliminarDialog";
import axios from "axios";

const TablaImpresoras = ({
  impresoras,
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
  const [impresoraAEliminar, setImpresoraAEliminar] = useState(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [selectedImpresora, setSelectedImpresora] = useState(null);
  const [passwordCorrectImpresoras, setPasswordCorrectImpresoras] = useState({});

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

  const sortedImpresoras = [...impresoras].sort((a, b) => {
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

  const impresorasPaginaActual = sortedImpresoras.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const abrirDialogoEliminar = (impresora) => {
    setImpresoraAEliminar(impresora);
    setOpenDialog(true);
  };

  const cerrarDialogoEliminar = () => {
    setImpresoraAEliminar(null);
    setOpenDialog(false);
  };

  const confirmarEliminacion = () => {
    if (impresoraAEliminar) {
      handleDelete(impresoraAEliminar.id);
    }
    cerrarDialogoEliminar();
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflowY: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {["ip", "nombre", "sector", "mac", "numeroSerie"].map((key) => (
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
          {impresorasPaginaActual.map((impresora) => (
            <TableRow key={impresora.id}>
              <TableCell>{impresora.ip}</TableCell>
              <TableCell>{impresora.nombre}</TableCell>
              <TableCell>{impresora.sector}</TableCell>
              <TableCell>{impresora.mac}</TableCell>
              <TableCell>{impresora.numeroSerie}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleOpenEditar(impresora)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => abrirDialogoEliminar(impresora)}>
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
        count={impresoras.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={(event) => handleChangeRowsPerPage(event)}
        showFirstButton
        showLastButton
        siblingCount={1}
      />

      <EliminarDialog
        openDialog={openDialog}
        cerrarDialogoEliminar={cerrarDialogoEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />
    </TableContainer>
  );
};

export default TablaImpresoras;