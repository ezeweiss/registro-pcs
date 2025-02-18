import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
          <p>¿Estás seguro de que deseas eliminar este equipo?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarDialogoEliminar} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmarEliminacion} color="error">
            Eliminar
          </Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default EliminarDialog