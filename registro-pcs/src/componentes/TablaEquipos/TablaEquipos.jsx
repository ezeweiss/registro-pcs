import React from "react";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, TableSortLabel, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const TablaEquipos = ({ equipos, orderBy, order, setOrderBy, handleEdit, handleDelete }) => {
  return (
    <TableContainer sx={{ maxHeight: 400 }} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {["host", "ip", "seriePC", "serieMonitor", "usuario", "sector", "direccion", "marca"].map((key) => (
              <TableCell key={key} sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={orderBy === key}
                  direction={orderBy === key ? order : "asc"}
                  onClick={() => setOrderBy(key)}
                >
                  {key.toUpperCase()}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipos.map((equipo) => (
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
                <IconButton color="primary" onClick={() => handleEdit(equipo)}>
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
  );
};

export default TablaEquipos;
