import React, { useEffect } from "react";
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

const FormCamaras = ({
  open,
  handleClose,
  newCamara,
  setNewCamara,
  errors,
  setErrors,
  handleSave,
  editMode,
  camaras,
  camaraOriginal,
  marcasCamaras,
}) => {

  useEffect(() => {
    if (editMode && camaraOriginal) {
      setNewCamara({
        ...camaraOriginal,
        marcasCamaras: camaraOriginal.id_cam_marc, 
      });
    }
  }, [editMode, camaraOriginal, setNewCamara]);

  const validateFields = () => {
    let formErrors = {};
    const ipRegex =
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (!newCamara.ip) {
      formErrors.ip = "La dirección IP es obligatoria";
    } else if (!ipRegex.test(newCamara.ip)) {
      formErrors.ip = "El formato de la dirección IP es inválido";
    }

    if (!newCamara.nombre) formErrors.nombre = "El nombre es obligatorio";
    if (!newCamara.sector) formErrors.sector = "El sector es obligatorio";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCamara((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{editMode ? "Editar Cámara" : "Agregar Nueva Cámara"}</DialogTitle>
      <form onSubmit={handleFormSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Información de la Cámara
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Dirección IP"
                fullWidth
                value={newCamara.ip || ""}
                onChange={(e) => setNewCamara({ ...newCamara, ip: e.target.value })}
                error={!!errors.ip}
                helperText={errors.ip || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Nombre"
                fullWidth
                value={newCamara.nombre || ""}
                onChange={(e) => setNewCamara({ ...newCamara, nombre: e.target.value })}
                error={!!errors.nombre}
                helperText={errors.nombre || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Sector"
                fullWidth
                value={newCamara.sector || ""}
                onChange={(e) => setNewCamara({ ...newCamara, sector: e.target.value })}
                error={!!errors.sector}
                helperText={errors.sector || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomSelect
                label="Marca"
                value={newCamara.marcasCamaras || ""}
                onChange={(newValue) => setNewCamara({ ...newCamara, marcasCamaras: Number(newValue) })}
                options={marcasCamaras.map((marca) => ({
                  id: marca.id,
                  nombre: marca.nombre, 
                }))}
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

export default FormCamaras;
