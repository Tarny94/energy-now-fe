import React, { useContext, useEffect, useRef } from 'react';
import InputComponent from '../../components/Input';
import TabButton from '../../components/Button';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registration } from '../../services/AuthenticationService';
import './styles/RegistrationPage.scss';
import {  } from './utils/AuthUtils';
import { AuthContext } from '../../context/AuthContext';


const Registration: React.FC = () => {
    const { 
        handleClickShowPassword, 
        handleMouseDownPassword, 
        handleBlur,
        error,
        setError,
        errors,
        setErrors,
        isError,
        setIsError,
        showPassword,
        setShowPassword,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        setFirstName,
        setLastName,
        setEmail,
        setPassword,
        setConfirmPassword,
    } = useContext(AuthContext);

    const [fieldErrors, setFieldErrors] = React.useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    useEffect(() => {
        handleErrors();
    }, [fieldErrors, error, firstName, lastName, email]);

    const handleErrors = () => {
        if (Object.values(fieldErrors).some((error) => error)) {
            setError('Please fill in all required fields correctly.');
            setIsError(true);
            return
        }
        
        if (password !== confirmPassword) {
            setError('Confirmation passwords do not match');
            setIsError(true);
            return
        }

        setIsError(false);
    }

    const handleAllEmptyFieldsSubmit = () => {
        const allFieldsEmpty =
        firstName.trim() === '' &&
        lastName.trim() === '' &&
        email.trim() === '' &&
        password.trim() === '' &&
        confirmPassword.trim() === '';

        if (allFieldsEmpty) {
            setFieldErrors({
                firstName: true,
                lastName: true,
                email: true,
                password: true,
                confirmPassword: true,
            });
            
            return true;
        }
        return false;
    }


    const handleSubmit = async () => {
        handleErrors();    

        if(isError || handleAllEmptyFieldsSubmit()) {
            return;
        }
        
        const userRegistration = {
            firstName,
            lastName,
            email,
            password
        }

        try {
            const response = await registration(userRegistration);

            if (response && response.length > 0) {
                await setErrors(response)
                setErrors(response.map((item: any) => item.description || 'Unknown error'));
            } else {
                setErrors([]);
                setError('');
                console.log("Registration successful");
                
            }
            
        } catch (error) {
            console.error("error: ",error);
        }
    }

    return <div className='registration-container'>
        <h1 className='registration-title'>Registration Page</h1>
        <div className='registration-field-container'>
            <div className='registration-fields'>
                <InputComponent 
                    onChange={setFirstName} 
                    required={true} size='medium' 
                    placeholder='Type First Name' 
                    width={300} 
                    ariaLabel='first name'
                    onBlur={() => handleBlur('firstName', firstName, setFieldErrors)}
                    error={fieldErrors.firstName} 
                    />
                <InputComponent 
                    onChange={setLastName} 
                    required={true} 
                    size='medium' 
                    ariaLabel='last name'
                    placeholder='Type Last Name' 
                    width={300}
                    onBlur={() => handleBlur('lastName', lastName, setFieldErrors)}
                    error={fieldErrors.lastName}
                    />
                <InputComponent 
                    onChange={setEmail} 
                    required type='email' 
                    size='medium' 
                    ariaLabel='email'
                    placeholder='Type Email'
                    width={300}
                    onBlur={() => handleBlur('email', email, setFieldErrors)}
                    error={fieldErrors.email}
                />
                <InputComponent 
                    onChange={setPassword} 
                    required={true} 
                    type={showPassword ? "text" : "password"}                
                    width={300}
                    placeholder='Type Password'
                    ariaLabel='password'
                    onBlur={() => handleBlur('password', password, setFieldErrors)}
                    error={fieldErrors.password}
                    endAdornment=
                        {
                            <InputAdornment 
                                position="end">
                                <IconButton
                                    size="small"
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? (
                                    <VisibilityOff fontSize="small" />
                                    ) : (
                                    <Visibility fontSize="small" />
                                    )}
                                </IconButton>
                            </InputAdornment> 
                        }
                     />
                     <InputComponent 
                    onChange={setConfirmPassword} 
                    required={true} 
                    type={showPassword ? "text" : "password"}
                    size='medium' 
                    width={300}
                    placeholder='Confirm Password'
                    ariaLabel='confirm password'
                    onBlur={() => handleBlur('confirmPassword', confirmPassword, setFieldErrors)}
                    error={fieldErrors.confirmPassword}                
                     />
                    <div className='registration-errors'>
                        {errors.length > 0 && errors.map((error: any, index: React.Key | null | undefined) => (
                            <p key={index}>{error}</p>
                        ))}
                        <p>{error && error}</p>
                    </div>
            </div>
            <div className='registration-buttons'>
                <TabButton 
                    onClick={handleSubmit}
                    label="Submit" 
                    variant="contained" 
                    color="primary"
                    // disable={isError}
                     />
                <TabButton 
                    onClick={() => console.log("clicked")} 
                    label="Cancel" 
                    variant="contained" 
                    color="inherit"/>
            </div>
        </div>
        <p>I already have an account</p>
    </div>;
};

export default Registration;