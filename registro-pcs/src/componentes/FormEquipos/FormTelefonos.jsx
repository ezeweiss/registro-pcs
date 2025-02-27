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

const FormTelefonos = ({
  open,
  handleClose,
  newTelefono,
  setNewTelefono,
  errors,
  setErrors,
  handleSave,
  editMode,
  telefonos,
  telefonoOriginal
}) => {

  const validateFields = () => {
    let formErrors = {};
    const ipRegex = 
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (newTelefono.ip !== telefonoOriginal.ip) {
      if (!newTelefono.ip) {
        formErrors.ip = "La dirección IP es obligatoria";
      } else if (!ipRegex.test(newTelefono.ip)) {
        formErrors.ip = "El formato de la dirección IP es inválido";
      } else if (
        telefonos.some(
          (telefono) =>
            telefono.ip === newTelefono.ip && telefono.id !== newTelefono.id
        )
      ) {
        formErrors.ip = "La dirección IP ya está registrada";
      }
    }

    if (!newTelefono.interno) formErrors.interno = "El número interno es obligatorio";
    if (!newTelefono.usuario) formErrors.usuario = "El usuario es obligatorio";
    if (!newTelefono.clave) formErrors.clave = "La clave es obligatoria";
    if (!newTelefono.sipUser) formErrors.sipUser = "El usuario SIP es obligatorio";
    if (!newTelefono.sipPassword) formErrors.sipPassword = "La contraseña SIP es obligatoria";
    if (!newTelefono.sector) formErrors.sector = "El sector es obligatorio";
    if (!newTelefono.numeroSerie) formErrors.numeroSerie = "El número de serie es obligatorio";
    if (!newTelefono.mac) formErrors.mac = "La dirección MAC es obligatoria";

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
      <DialogTitle>{editMode ? "Editar Teléfono" : "Agregar Nuevo Teléfono"}</DialogTitle>
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
                value={newTelefono.ip || ""}
                onChange={(e) => setNewTelefono({ ...newTelefono, ip: e.target.value })}
                error={!!errors.ip}
                helperText={errors.ip || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Número Interno"
                fullWidth
                value={newTelefono.interno || ""}
                onChange={(e) => setNewTelefono({ ...newTelefono, interno: e.target.value })}
                error={!!errors.interno}
                helperText={errors.interno || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Usuario"
                fullWidth
                value={newTelefono.usuario || ""}
                onChange={(e) => setNewTelefono({ ...newTelefono, usuario: e.target.value })}
                error={!!errors.usuario}
                helperText={errors.usuario || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Clave"
                type="password"
                fullWidth
                value={newTelefono.clave || ""}
                onChange={(e) => setNewTelefono({ ...newTelefono, clave: e.target.value })}
                error={!!errors.clave}
                helperText={errors.clave || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Usuario SIP"
                fullWidth
                value={newTelefono.sipUser || ""}
                onChange={(e) => setNewTelefono({ ...newTelefono, sipUser: e.target.value })}
                error={!!errors.sipUser}
                helperText={errors.sipUser || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Contraseña SIP"
                type="password"
                fullWidth
                value={newTelefono.sipPassword || ""}
                onChange={(e) => setNewTelefono({ ...newTelefono, sipPassword: e.target.value })}
                error={!!errors.sipPassword}
                helperText={errors.sipPassword || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Sector"
                fullWidth
                value={newTelefono.sector || ""}
                onChange={(e) => setNewTelefono({ ...newTelefono, sector: e.target.value })}
                error={!!errors.sector}
                helperText={errors.sector || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Número de Serie"
                fullWidth
                value={newTelefono.numeroSerie || ""}
                onChange={(e) => setNewTelefono({ ...newTelefono, numeroSerie: e.target.value })}
                error={!!errors.numeroSerie}
                helperText={errors.numeroSerie || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Dirección MAC"
                fullWidth
                value={newTelefono.mac || ""}
                onChange={(e) => setNewTelefono({ ...newTelefono, mac: e.target.value })}
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

export default FormTelefonos;
