import React from 'react';
import InputComponent from '../../components/Input';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { handleBlur, handleClickShowPassword } from './utils/AuthUtils';
import TabButton from '../../components/Button';
import './styles/LogginPage.scss';
import { login } from '../../services/AuthenticationService';

const Loggin: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [errors, setErrors] = React.useState<any>([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState({
    email: false,
    password: false,
  });


  const handleClickShowPasswordFunction = () => {
      handleClickShowPassword(setShowPassword, showPassword);
  };

  const handleSubmit = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setFieldErrors((prev: any) => ({ ...prev, email: email.trim() === '', password: password.trim() === '' }));
      setError('Please fill in all required fields correctly.');
      setIsError(true);
      return;
    }

  const userLoggin = {
    email,
    password
  }  
    const result = login(userLoggin);

    console.log("result", await result);
    

  };

  return <div className='loggin-container'>
      <h1 className='loggin-title'>Loggin</h1>
      <div className='loggin-field-container'>
        <div className='loggin-fields'>
          <InputComponent 
              onChange={setEmail} 
              required type='email' 
              size='medium' 
              ariaLabel='email'
              placeholder='Type your Email or Username'
              width={300}
              onBlur={() => handleBlur('email', email, setFieldErrors, setError)}
              error={fieldErrors.email}
          />
          <InputComponent 
              onChange={setPassword} 
              required={true} 
              type={showPassword ? "text" : "password"}                
              width={300}
              placeholder='Type your Password'
              ariaLabel='password'
              onBlur={() => handleBlur('password', password, setFieldErrors, setError)}
              error={fieldErrors.password}
              endAdornment=
                {
                  <InputAdornment 
                      position="end">
                      <IconButton
                          size="small"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordFunction}
                          onMouseDown={handleClickShowPasswordFunction}
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
        </div>
       <div className='loggin-buttons'>
          <TabButton 
            onClick={handleSubmit}
            label="Loggin" 
            variant="contained" 
            color="primary"
              />
        </div>
        <div>
          <p>You don't have an account?</p>
          <p>Forgot your password?</p>
        </div>
      </div>
    </div>;
};

export default Loggin;