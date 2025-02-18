import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'

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

function EliminarDialog({ openDialog, cerrarDialogoEliminar, confirmarEliminacion}) {

  return (
    <>
    <Dialog open={openDialog} onClose={cerrarDialogoEliminar}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" fontWeight="bold">
            ¿Estás seguro de que deseas eliminar este equipo?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarDialogoEliminar} color="error" variant="outlined">
            Cancelar
          </Button>
          <Button onClick={confirmarEliminacion} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default EliminarDialog