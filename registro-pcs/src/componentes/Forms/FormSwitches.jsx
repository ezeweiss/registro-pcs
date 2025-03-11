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
import CustomSelect from "../../CustomSelect";

const FormSwitches = ({
  open,
  handleClose,
  newSwitch,
  setNewSwitch,
  errors,
  setErrors,
  handleSave,
  editMode,
  switches,
  switchOriginal
}) => {

  const validateFields = () => {
    let formErrors = {};
    const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
    // Validar IP
    if (newSwitch.ip !== switchOriginal.ip) {
      if (!newSwitch.ip) {
        formErrors.ip = "La dirección IP es obligatoria";
      } else if (!ipRegex.test(newSwitch.ip)) {
        formErrors.ip = "El formato de la dirección IP es inválido";
      } else if (
        switches.some(
          (switchItem) =>
            switchItem.ip === newSwitch.ip && switchItem.id !== newSwitch.id
        )
      ) {
        formErrors.ip = "La dirección IP ya está registrada";
      }
    }
  
    // Validar MAC
    if (newSwitch.mac !== switchOriginal.mac) {
      if (!newSwitch.mac) formErrors.mac = "La dirección MAC es obligatoria";
      else if (
        switches.some(
          (switchItem) =>
            switchItem.mac.toLowerCase() === newSwitch.mac.toLowerCase() &&
            switchItem.id !== newSwitch.id
        )
      ) {
        formErrors.mac = "La dirección MAC ya está registrada";
      }
    }
  
    // Validar otros campos
    if (!newSwitch.subred) formErrors.subred = "La subred es obligatoria";
    if (!newSwitch.usuario) formErrors.usuario = "El usuario es obligatorio";
    if (!newSwitch.sector) formErrors.sector = "El sector es obligatorio";
    if (!newSwitch.marca) formErrors.marca = "La marca es obligatoria";
  
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
      <DialogTitle>{editMode ? "Editar Switch" : "Agregar Nuevo Switch"}</DialogTitle>
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
                label="Dirección MAC"
                placeholder="Ej. AA:BB:CC:DD:EE:FF"
                fullWidth
                value={newSwitch.mac || ""}
                onChange={(e) => setNewSwitch({ ...newSwitch, mac: e.target.value })}
                error={!!errors.mac}
                helperText={errors.mac || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Dirección IP"
                placeholder="Ej. 10.0.1.x"
                fullWidth
                value={newSwitch.ip || ""}
                onChange={(e) => setNewSwitch({ ...newSwitch, ip: e.target.value })}
                error={!!errors.ip}
                helperText={errors.ip || ""}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Identificación
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Subred"
                placeholder="Ej. 255.0.0.0"
                fullWidth
                value={newSwitch.subred || ""}
                onChange={(e) => setNewSwitch({ ...newSwitch, subred: e.target.value })}
                error={!!errors.subred}
                helperText={errors.subred || ""}
              />
            </Grid>

            <Grid item xs={6}>
              {!editMode ? (
                <TextField
                  label="Usuario"
                  placeholder="Ej. usuario"
                  fullWidth
                  value={newSwitch.usuario || ""}
                  onChange={(e) => setNewSwitch({ ...newSwitch, usuario: e.target.value })}
                  error={!!errors.usuario}
                  helperText={errors.usuario || ""}
                />
              ) : (
                <TextField
                  label="Usuario"
                  fullWidth
                  value={newSwitch.usuario || ""}
                  onChange={(e) => setNewSwitch({ ...newSwitch, usuario: e.target.value })}
                  error={!!errors.usuario}
                  helperText={errors.usuario || ""}
                  type="password"
                />
              )}
            </Grid>

            <Grid item xs={6}>
              {!editMode ? (
                <TextField
                  label="Clave"
                  placeholder="Ej. Contraseña123"
                  fullWidth
                  value={newSwitch.clave || ""}
                  onChange={(e) => setNewSwitch({ ...newSwitch, clave: e.target.value })}
                  error={!!errors.clave}
                  helperText={errors.clave || ""}
                />
              ) : (
                <TextField
                  label="Clave"
                  fullWidth
                  value={newSwitch.clave || ""}
                  onChange={(e) => setNewSwitch({ ...newSwitch, clave: e.target.value })}
                  error={!!errors.clave}
                  helperText={errors.clave || ""}
                  type="password"
                />
              )}
            </Grid>



            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Ubicación y Asignación
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Sector"
                placeholder="Ej. Oficina de Sistemas"
                fullWidth
                value={newSwitch.sector || ""}
                onChange={(e) => setNewSwitch({ ...newSwitch, sector: e.target.value })}
                error={!!errors.sector}
                helperText={errors.sector || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Marca"
                placeholder="Ej. Cisco"
                fullWidth
                value={newSwitch.marca || ""}
                onChange={(e) => setNewSwitch({ ...newSwitch, marca: e.target.value })}
                error={!!errors.marca}
                helperText={errors.marca || ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ padding: "16px" }}>
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

export default FormSwitches;
