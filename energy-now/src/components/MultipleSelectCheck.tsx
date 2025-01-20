import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


interface IMultipleSelectCheckmarksProps {
    labelId?: string;
    id?: string;
    inputLabelName?: string;
    label?: string;
    width?: number;
    m?: number;
    setSelectedItems: (value: string[]) => void;
    selectedItems: string[];
    items: string[];
}

export default function MultipleSelectCheckmarks({
    inputLabelName = "Tag", 
    labelId = "demo-multiple-checkbox-label", 
    id = "demo-multiple-checkbox", 
    m = 1, 
    label = "Tag", 
    width = 300, 
    setSelectedItems, 
    selectedItems,
    items
}: IMultipleSelectCheckmarksProps) {

  const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
      const {
        target: { value },
      } = event;
      setSelectedItems(
        typeof value === 'string' ? value.split(',') : value,
      );
  };

  return (              
    <div>
      <FormControl sx={{ m: {m}, width: width, margin: 2 }}>
        <InputLabel id={id}>{inputLabelName}</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput label={inputLabelName} />}
          renderValue={(selected) => selected.join(', ')}
          >
          {items.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedItems.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
