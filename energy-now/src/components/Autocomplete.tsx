import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface IOption {
    code?: string;
    label: string;
}

interface IAutocomplete {
    sx?: any;
    options: IOption[];
    size?: "small" | "medium";
    variant: 'filled' | 'outlined' | 'standard';
    label: string;
    isDisable?: boolean;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

const AutocompleteInput: React.FC<IAutocomplete> = ({sx, options, size, variant, label, isDisable, onChange}) => {

    const handleChange = (event: React.SyntheticEvent, value: any | null) => {
        onChange(value.label);  // Store the selected value in state
    };

    return (
        <Autocomplete
              id="country-select-demo"
              sx={sx}
              options={options}
              size={size}
              disabled={isDisable}               // Provide the array of options
              getOptionLabel={(option) => option.label}  // Specify how to display each option
              renderOption={(props, option) => (
                <li {...props} key={option.code}>
                  {option.label} {option.code !== ""? '(' + option.code + ')' : ""}
                </li>
              )}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}  // Label for the input field
                  variant={variant}
                />
              )}
            />
    );
  };
  
  export default AutocompleteInput;