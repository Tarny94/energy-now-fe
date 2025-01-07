import { Input } from '@mui/material';
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
  }

const InputComponent: React.FC<IInput> = ({onBlur, error = false, type, color, size, sx, onChange, disabled, required = false, ariaLabel, placeholder, name, width, endAdornment}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    }

  return <Input
    aria-label={ariaLabel}
    placeholder={placeholder}
    name={name} 
    type={type}
    color={color}
    size={size}
    title='url'
    sx={{width: width, padding: 1.5, ...sx}} 
    onChange={handleChange}
    disabled={disabled}
    required={required}
    endAdornment={endAdornment}
    error={error}
    onBlur={onBlur}

    />;
}

export default InputComponent;
