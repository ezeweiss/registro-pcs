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

const TablaTelefonos = ({
  telefonos,
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
  const [telefonoAEliminar, setTelefonoAEliminar] = useState(null);
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

  const sortedTelefonos = [...telefonos].sort((a, b) => {
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

  const telefonosPaginaActual = sortedTelefonos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


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
  
    const ipUsadas = telefonos.map(e => e.ip);
    const disponibles = todasLasIps.filter(ip => !ipUsadas.includes(ip));
  
    setIpNoUsadas(disponibles);
  }, [telefonos]);


  const abrirDialogoEliminar = (telefono) => {
    setTelefonoAEliminar(telefono);
    setOpenDialog(true);
  };

  const cerrarDialogoEliminar = () => {
    setTelefonoAEliminar(null);
    setOpenDialog(false);
  };

  const confirmarEliminacion = () => {
    if (telefonoAEliminar) {
      handleDelete(telefonoAEliminar.id);
    }
    cerrarDialogoEliminar();
  };

  return (
    <><TableContainer component={Paper} sx={{ maxHeight: "70vh", overflowY: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {["ip", "interno", "usuario", "clave", "sipUser", "sipPassword", "sector", "numeroSerie", "mac" ].map((key) => (
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
          {telefonosPaginaActual.map((telefono) => (
            <TableRow key={telefono.id}>
              <TableCell>{telefono.ip}</TableCell>
              <TableCell>{telefono.interno}</TableCell>
              <TableCell>{telefono.usuario}</TableCell>
              <TableCell>{telefono.clave}</TableCell>
              <TableCell>{telefono.sipUser}</TableCell>
              <TableCell>{telefono.sipPassword}</TableCell>
              <TableCell>{telefono.sector}</TableCell>
              <TableCell>{telefono.numeroSerie}</TableCell>
              <TableCell>{telefono.mac}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleOpenEditar(telefono)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => abrirDialogoEliminar(telefono)}>
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
        count={telefonos.length}
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

export default TablaTelefonos;
