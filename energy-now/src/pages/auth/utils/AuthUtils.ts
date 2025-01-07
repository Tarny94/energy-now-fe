import React from 'react';



export const handleClickShowPassword = (setShowPassword: any, showPassword: boolean) => {
    setShowPassword(!showPassword);
}

export const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
};

export const handleBlur = (field: string, value: string, setFieldErrors: any, setError: any ) => {
    
    if (value.trim() === '' || value === '') {
        setFieldErrors((prev: any) => ({ ...prev, [field]: true }));
    } else {
        setError('');
        setFieldErrors((prev: any) => ({ ...prev, [field]: false }));
    }
};