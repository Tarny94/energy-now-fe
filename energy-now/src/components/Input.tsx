import { FormControl, Input, InputLabel } from '@mui/material';
import { on } from 'events';
import React, { Dispatch, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';
import { error } from 'console';

interface IInput{
    type?: 'button'
| 'checkbox'
| 'color'
| 'date'
| 'datetime-local'
| 'email'
| 'file'
| 'hidden'
| 'image'
| 'month'
| 'number'
| 'password'
| 'radio'
| 'range'
| 'reset'
| 'search'
| 'submit'
| 'tel'
| 'text'
| 'time'
| 'url'
| 'week'
| undefined;
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
    size?: "small" | "medium" | undefined;
    sx?: {
      color?: string,
      fontSize?: number,
      fontWeight? : string | number,
      fontFamily?: string,
      padding?: number
    };
    ariaLabel?: string;
    width?: number;
    placeholder?: string;
    value?: string;
    onChange: Dispatch<SetStateAction<any>>;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    endAdornment?: React.ReactNode;
    error?: boolean;
    onBlur?: () => void;
    variant?: "standard" | "outlined" | "filled";
    label?: string;
  }

const InputComponent: React.FC<IInput> = ({label, variant = "standard", onBlur, error = false, type, color, size, sx, onChange, disabled, required = false, ariaLabel, placeholder, name, width, endAdornment}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    }


  return (
        //"standard" | "outlined" | "filled"
  <FormControl 
    variant={variant} 
    disabled={disabled} 
    sx={{marginTop: 1, width: width, }} 
    required={required}
  >
    <InputLabel>{label}</InputLabel>
    <Input
      aria-label={ariaLabel}
      placeholder={placeholder}
      name={name} 
      type={type}
      color={color}
      size={size}
      onChange={handleChange}
      endAdornment={endAdornment}
      error={error}
      onBlur={onBlur}
      />
  </FormControl>
  );
}

export default InputComponent;
