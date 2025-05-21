import React, { useState } from "react";
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

const TablaCamaras = ({
  marcasCamaras,
  camaras,
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
  const [camaraAEliminar, setCamaraAEliminar] = useState(null);
 
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

  const sortedCamaras = [...camaras].sort((a, b) => {
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

  const camarasPaginaActual = sortedCamaras.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const abrirDialogoEliminar = (camara) => {
    setCamaraAEliminar(camara);
    setOpenDialog(true);
  };

  const cerrarDialogoEliminar = () => {
    setCamaraAEliminar(null);
    setOpenDialog(false);
  };

  const confirmarEliminacion = () => {
    if (camaraAEliminar) {
      handleDelete(camaraAEliminar.id);
    }
    cerrarDialogoEliminar();
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflowY: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {["IP", "Nombre", "Sector", "Marca"].map((key) => (
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
        {camarasPaginaActual.map((camara) => {
        return (
          <TableRow key={camara.id}>
            <TableCell>
              <a 
                href={`http://${camara.ip}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
              >
                {camara.ip}
              </a>
            </TableCell>
            <TableCell>{camara.nombre}</TableCell>
            <TableCell>{camara.sector}</TableCell>
            <TableCell>{camara.marcas_camaras?.nombre}</TableCell>
            <TableCell>
              <IconButton color="primary" onClick={() => handleOpenEditar(camara)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => abrirDialogoEliminar(camara)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
        </TableBody>
      </Table>


      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={camaras.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
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

export default TablaCamaras;
