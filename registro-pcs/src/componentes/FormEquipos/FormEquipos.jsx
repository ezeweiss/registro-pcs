// import { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   TextField,
//   Typography,
// } from "@mui/material";
// import CustomSelect from "../../CustomSelect"; // Asegúrate de importar correctamente

// const FormEquipos = ({ open, handleClose, handleGuardar, editMode, newEquipo, setNewEquipo, direcciones, marcas }) => {
//   const [errors, setErrors] = useState({});

//   const validarCampos = () => {
//     const newErrors = {};
//     if (!newEquipo.host) newErrors.host = "El nombre del equipo es obligatorio.";
//     if (!newEquipo.ip) newErrors.ip = "La dirección IP es obligatoria.";
//     if (!newEquipo.seriePc) newErrors.seriePc = "El número de serie de la PC es obligatorio.";
//     if (!newEquipo.serieMonitor) newErrors.serieMonitor = "El número de serie del monitor es obligatorio.";
//     if (!newEquipo.usuario) newErrors.usuario = "La persona responsable es obligatoria.";
//     if (!newEquipo.sector) newErrors.sector = "El sector es obligatorio.";
//     if (!newEquipo.direccion) newErrors.direccion = "Debe seleccionar una dirección.";
//     if (!newEquipo.marca) newErrors.marca = "Debe seleccionar una marca.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = () => {
//     if (validarCampos()) {
//       handleGuardar(); // Llamar la función que guarda los datos si todo está correcto
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//       <DialogTitle>{editMode ? "Editar PC" : "Agregar Nueva PC"}</DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Typography variant="subtitle1" fontWeight="bold">
//               Información General
//             </Typography>
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               label="Nombre del Equipo"
//               placeholder="Ej. PC-Sala1"
//               fullWidth
//               value={newEquipo.host || ""}
//               onChange={(e) => setNewEquipo({ ...newEquipo, host: e.target.value })}
//               error={!!errors.host}
//               helperText={errors.host || ""}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               label="Dirección IP"
//               placeholder="Ej. 192.168.1.100"
//               fullWidth
//               value={newEquipo.ip || ""}
//               onChange={(e) => setNewEquipo({ ...newEquipo, ip: e.target.value })}
//               error={!!errors.ip}
//               helperText={errors.ip || ""}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="subtitle1" fontWeight="bold">
//               Identificación
//             </Typography>
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               label="Número de Serie PC"
//               placeholder="Ej. SN12345"
//               fullWidth
//               value={newEquipo.seriePc || ""}
//               onChange={(e) => setNewEquipo({ ...newEquipo, seriePc: e.target.value })}
//               error={!!errors.seriePc}
//               helperText={errors.seriePc || ""}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               label="Número de Serie Monitor"
//               placeholder="Ej. MON67890"
//               fullWidth
//               value={newEquipo.serieMonitor || ""}
//               onChange={(e) => setNewEquipo({ ...newEquipo, serieMonitor: e.target.value })}
//               error={!!errors.serieMonitor}
//               helperText={errors.serieMonitor || ""}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="subtitle1" fontWeight="bold">
//               Ubicación y Asignación
//             </Typography>
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               label="Persona Responsable"
//               placeholder="Ej. Juan Pérez"
//               fullWidth
//               value={newEquipo.usuario || ""}
//               onChange={(e) => setNewEquipo({ ...newEquipo, usuario: e.target.value })}
//               error={!!errors.usuario}
//               helperText={errors.usuario || ""}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               label="Sector"
//               placeholder="Ej. Oficina de Sistemas"
//               fullWidth
//               value={newEquipo.sector || ""}
//               onChange={(e) => setNewEquipo({ ...newEquipo, sector: e.target.value })}
//               error={!!errors.sector}
//               helperText={errors.sector || ""}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <CustomSelect
//               label="Dirección"
//               value={newEquipo.direccion || ""}
//               onChange={(newValue) => setNewEquipo({ ...newEquipo, direccion: Number(newValue) })}
//               options={direcciones}
//               error={!!errors.direccion}
//               helperText={errors.direccion || ""}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <CustomSelect
//               label="Marca"
//               value={newEquipo.marca || ""}
//               onChange={(newValue) => setNewEquipo({ ...newEquipo, marca: Number(newValue) })}
//               options={marcas}
//               error={!!errors.marca}
//               helperText={errors.marca || ""}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>

//       <DialogActions sx={{ padding: "16px" }}>
//         <Button onClick={handleClose} color="error" variant="outlined">
//           Cancelar
//         </Button>
//         <Button onClick={handleSave} color="success" variant="contained">
//           Guardar
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default FormEquipos;
