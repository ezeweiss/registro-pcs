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
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import EliminarDialog from "../Dialog/EliminarDialog";
import axios from "axios";


const TablaSwitches = ({
  switches,
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
  const [switchAEliminar, setSwitchAEliminar] = useState(null);
  const [currentPage, setCurrentPage] = useState(page);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [selectedSwitch, setSelectedSwitch] = useState(null);
  const [passwordCorrectSwitches, setPasswordCorrectSwitches] = useState({});

  useEffect(() => {
  }, [switches]);

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

  const sortedSwitches = [...switches].sort((a, b) => {
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

  const switchesPaginaActual = sortedSwitches.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const abrirDialogoEliminar = (sw) => {
    setSwitchAEliminar(sw);
    setOpenDialog(true);
  };

  const cerrarDialogoEliminar = () => {
    setSwitchAEliminar(null);
    setOpenDialog(false);
  };

  const confirmarEliminacion = () => {
    if (switchAEliminar) {
      handleDelete(switchAEliminar.id);
    }
    cerrarDialogoEliminar();
  };

  const abrirDialogoClave = (sw) => {
    setSelectedSwitch(sw);
    setPasswordDialogOpen(true);
  };

  const cerrarDialogoClave = () => {
    setPasswordDialogOpen(false);
    setPasswordInput("");
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/switches/${selectedSwitch.id}`, {
        params: { clave: passwordInput },
      });

      if (response.status === 200) {
        setPasswordCorrectSwitches((prev) => ({
          ...prev,
          [selectedSwitch.id]: true,
        }));
        cerrarDialogoClave();
      } else {
        setPasswordCorrectSwitches((prev) => ({
          ...prev,
          [selectedSwitch.id]: false,
        }));
      }
    } catch (error) {
      console.error("Error al verificar la clave", error);
      setPasswordCorrectSwitches((prev) => ({
        ...prev,
        [selectedSwitch.id]: false,
      }));
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflowY: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {["mac", "ip", "subred", "usuario", "clave", "sector", "marca"].map((key) => (
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
          {switchesPaginaActual.map((sw) => (
            <TableRow key={sw.id}>
              <TableCell>{sw.mac}</TableCell>
              <TableCell>{sw.ip}</TableCell>
              <TableCell>{sw.subred}</TableCell>
              <TableCell>
                {passwordCorrectSwitches[sw.id] ? (
                  <p>{sw.usuario}</p>
                ) : (
                  <IconButton onClick={() => abrirDialogoClave(sw)}>
                    <Visibility />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                {passwordCorrectSwitches[sw.id] ? (
                  <p>{sw.clave}</p>
                ) : (
                  <IconButton onClick={() => abrirDialogoClave(sw)}>
                    <Visibility />
                  </IconButton>
                )}
              </TableCell>

              <TableCell>{sw.sector}</TableCell>
              <TableCell>{sw.marca}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleOpenEditar(sw)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => abrirDialogoEliminar(sw)}>
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
        count={switches.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={(event, newPage) => {
          setCurrentPage(newPage);
          handleChangePage(event, newPage);
        }}
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
      <Dialog open={passwordDialogOpen} onClose={cerrarDialogoClave}>
        <DialogTitle>Ver Usuario/Clave</DialogTitle>
        <DialogContent>
          <TextField
            label="Ingrese la clave"
            type="password"
            fullWidth
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            error={passwordInput && !passwordCorrectSwitches[selectedSwitch?.id]}
            helperText={passwordInput && !passwordCorrectSwitches[selectedSwitch?.id] && "Clave incorrecta"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarDialogoClave} color="primary">
            Cancelar
          </Button>
          <Button onClick={handlePasswordSubmit} color="primary" variant="contained">
            Ver
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default TablaSwitches;
