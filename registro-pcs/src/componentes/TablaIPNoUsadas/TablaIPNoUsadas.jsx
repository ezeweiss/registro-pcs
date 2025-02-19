import React, { useEffect, useState } from "react";
import { getEquipos } from "../../api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from "@mui/material";

const TablaIPNoUsadas = ({ open, onClose }) => {
  const [ipNoUsadas, setIpNoUsadas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Función para cargar los equipos y calcular las IPs no usadas
  const fetchEquipos = async () => {
    try {
      const equipos = await getEquipos();
      const ipsUsadas = equipos.map((equipo) => equipo.ip);

      const generateAllIps = (startIp, endIp) => {
        let allIps = [];
        let start = startIp.split(".").map(Number);
        let end = endIp.split(".").map(Number);

        for (let i = start[3]; i <= end[3]; i++) {
          allIps.push(`${start[0]}.${start[1]}.${start[2]}.${i}`);
        }

        return allIps;
      };

      const allIps = generateAllIps("10.0.14.1", "10.0.14.255");
      const ipNoUsadas = allIps.filter((ip) => !ipsUsadas.includes(ip));

      setIpNoUsadas(ipNoUsadas);
    } catch (error) {
      console.error("Error al obtener los equipos:", error);
    }
  };

  // Llamar a fetchEquipos cuando el Dialog se abre
  useEffect(() => {
    if (open) {
      fetchEquipos();
    }
  }, [open]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>IPs No Usadas</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>IP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ipNoUsadas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ip, index) => (
                  <TableRow key={index}>
                    <TableCell>{ip}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ipNoUsadas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TablaIPNoUsadas;

