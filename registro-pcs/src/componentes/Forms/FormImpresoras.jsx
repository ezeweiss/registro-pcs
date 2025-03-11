import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const FormImpresoras = ({
  open,
  handleClose,
  newImpresora,
  setNewImpresora,
  errors,
  setErrors,
  handleSave,
  editMode,
  impresoras,
  impresoraOriginal
}) => {

  const validateFields = () => {
    let formErrors = {};
    const ipRegex = 
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (newImpresora.ip !== impresoraOriginal.ip) {
      if (!newImpresora.ip) {
        formErrors.ip = "La dirección IP es obligatoria";
      } else if (!ipRegex.test(newImpresora.ip)) {
        formErrors.ip = "El formato de la dirección IP es inválido";
      } else if (
        impresoras.some(
          (impresora) =>
            impresora.ip === newImpresora.ip && impresora.id !== newImpresora.id
        )
      ) {
        formErrors.ip = "La dirección IP ya está registrada";
      }
    }

    if (!newImpresora.nombre) formErrors.nombre = "El nombre es obligatorio";
    if (!newImpresora.sector) formErrors.sector = "El sector es obligatorio";
    if (!newImpresora.numeroSerie) formErrors.numeroSerie = "El número de serie es obligatorio";
    if (!newImpresora.mac) formErrors.mac = "La dirección MAC es obligatoria";

    return formErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateFields();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    handleSave();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{editMode ? "Editar Impresora" : "Agregar Nueva Impresora"}</DialogTitle>
      <form onSubmit={handleFormSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Información General
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Dirección IP"
                fullWidth
                value={newImpresora.ip || ""}
                onChange={(e) => setNewImpresora({ ...newImpresora, ip: e.target.value })}
                error={!!errors.ip}
                helperText={errors.ip || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Nombre"
                fullWidth
                value={newImpresora.nombre || ""}
                onChange={(e) => setNewImpresora({ ...newImpresora, nombre: e.target.value })}
                error={!!errors.nombre}
                helperText={errors.nombre || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Sector"
                fullWidth
                value={newImpresora.sector || ""}
                onChange={(e) => setNewImpresora({ ...newImpresora, sector: e.target.value })}
                error={!!errors.sector}
                helperText={errors.sector || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Número de Serie"
                fullWidth
                value={newImpresora.numeroSerie || ""}
                onChange={(e) => setNewImpresora({ ...newImpresora, numeroSerie: e.target.value })}
                error={!!errors.numeroSerie}
                helperText={errors.numeroSerie || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Dirección MAC"
                fullWidth
                value={newImpresora.mac || ""}
                onChange={(e) => setNewImpresora({ ...newImpresora, mac: e.target.value })}
                error={!!errors.mac}
                helperText={errors.mac || ""}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error" variant="outlined">
            Cancelar
          </Button>
          <Button type="submit" color="success" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormImpresoras;