import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const CustomSelect = ({ label, value, onChange, options }) => {
    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} onChange={onChange}>
          {options.map(option => (
            <MenuItem key={option.id} value={option.nombre}>
              {option.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  

export default CustomSelect;
