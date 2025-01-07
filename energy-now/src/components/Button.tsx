import React from 'react';
import Button from '@mui/material/Button';

interface IButton {
  variant: "text" | "outlined" | "contained"  | undefined;
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
  size?: "small" | "medium" | "large" | undefined;
  sx?: {
    color: string,
    fontSize: number,
    fontWeight : string | number,
    fontFamily?: string,
    padding: number
  };
  label: string;
  onClick: () => void;
}

const TabButton: React.FC<IButton> = ({ variant, color, size, sx, label, onClick }) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      size={size}
      sx={sx}
    >
      {label}
    </Button>
  );
  
};

export default TabButton;