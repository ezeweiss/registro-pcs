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

const FormEquipos = ({
  open,
  handleClose,
  newEquipo,
  setNewEquipo,
  errors,
  setErrors,
  handleSave,
  editMode,
  direcciones,
  marcas,
}) => {


const validateFields = () => {
  let formErrors = {};

  const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (!newEquipo.ip) {
    formErrors.ip = "La dirección IP es obligatoria";
  } else if (!ipRegex.test(newEquipo.ip)) {
    formErrors.ip = "El formato de la dirección IP es inválido";
  }

  const usuarioRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
  if (!newEquipo.usuario) {
    formErrors.usuario = "El usuario es obligatorio";
  } else if (!usuarioRegex.test(newEquipo.usuario)) {
    formErrors.usuario = "El nombre del usuario solo puede contener letras y espacios";
  }

  if (!newEquipo.host) formErrors.host = "El nombre del equipo es obligatorio";
  if (!newEquipo.seriePc) formErrors.seriePc = "El número de serie de la PC es obligatorio";
  if (!newEquipo.serieMonitor) formErrors.serieMonitor = "El número de serie del monitor es obligatorio";
  if (!newEquipo.sector) formErrors.sector = "El sector es obligatorio";
  if (!newEquipo.direccion) formErrors.direccion = "La dirección es obligatoria";
  if (!newEquipo.marca) formErrors.marca = "La marca es obligatoria";

  return formErrors;
};

const handleFormSubmit = () => {
  const formErrors = validateFields();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }
  handleSave();
};



  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{editMode ? "Editar PC" : "Agregar Nueva PC"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Información General
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Nombre del Equipo"
              placeholder="Ej. DT-Sala-01"
              fullWidth
              value={newEquipo.host || ""}
              onChange={(e) => setNewEquipo({ ...newEquipo, host: e.target.value })}
              error={!!errors.host}
              helperText={errors.host || ""}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Dirección IP"
              placeholder="Ej. 10.0.14.x"
              fullWidth
              value={newEquipo.ip || ""}
              onChange={(e) => setNewEquipo({ ...newEquipo, ip: e.target.value })}
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
              label="Número de Serie PC"
              placeholder="Ej. AR2000XXXXXX"
              fullWidth
              value={newEquipo.seriePc || ""}
              onChange={(e) => setNewEquipo({ ...newEquipo, seriePc: e.target.value })}
              error={!!errors.seriePc}
              helperText={errors.seriePc || ""}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Número de Serie Monitor"
              placeholder="Ej. AR2000XXXXXX"
              fullWidth
              value={newEquipo.serieMonitor || ""}
              onChange={(e) => setNewEquipo({ ...newEquipo, serieMonitor: e.target.value })}
              error={!!errors.serieMonitor}
              helperText={errors.serieMonitor || ""}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Ubicación y Asignación
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Persona Responsable"
              placeholder="Ej. Juan Pérez"
              fullWidth
              value={newEquipo.usuario || ""}
              onChange={(e) => setNewEquipo({ ...newEquipo, usuario: e.target.value })}
              error={!!errors.usuario}
              helperText={errors.usuario || ""}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Sector"
              placeholder="Ej. Oficina de Sistemas"
              fullWidth
              value={newEquipo.sector || ""}
              onChange={(e) => setNewEquipo({ ...newEquipo, sector: e.target.value })}
              error={!!errors.sector}
              helperText={errors.sector || ""}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomSelect
              label="Dirección"
              value={newEquipo.direccion || ""}
              onChange={(newValue) => setNewEquipo({ ...newEquipo, direccion: Number(newValue) })}
              options={direcciones}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomSelect
              label="Marca"
              value={newEquipo.marca || ""}
              onChange={(newValue) => setNewEquipo({ ...newEquipo, marca: Number(newValue) })}
              options={marcas}
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ padding: "16px" }}>
        <Button onClick={handleClose} color="error" variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleFormSubmit} color="success" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormEquipos;
