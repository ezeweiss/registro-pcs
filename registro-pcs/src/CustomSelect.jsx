import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const CustomSelect = ({ label, value, onChange, options }) => {
  const handleChange = (e) => {
    const selectedValue = Number(e.target.value);
    console.log("✅ Nuevo valor seleccionado:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={handleChange}>
        {options.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;

