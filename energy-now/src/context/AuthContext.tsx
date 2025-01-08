// context/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { AUTH_LOCAL_STORAGE } from '../pages/auth/utils/AuthUtils';
import { log } from 'console';

interface AuthContextType {
  isAuthenticated: boolean;
  handleLogin: (data: any) => void;
  handleLogout: () => void;
  handleClickShowPassword: () => void,
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void,
  handleBlur: (field: string, value: string, setFieldErrors: any) => void,
  error: string;
  errors: any[];
  showPassword: boolean;
  setShowPassword: any;
  isError: boolean;
  setErrors: any;
  setError: any;
  setIsError: any;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  setFirstName: any;
  setLastName: any;
  setEmail: any;
  setPassword: any;
  setConfirmPassword: any;
  authData: any;
  setAuthData: any;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  handleLogin: () => {},
  handleLogout: () => {},
  handleClickShowPassword: () => {},
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => {},
  handleBlur: (field: string, value: string, setFieldErrors: any) => {},
  error: '',
  errors: [],
  showPassword: false,
  setShowPassword: () => {},
  isError: false,
  setErrors: () => {},
  setError: () => {},
  setIsError: () => {},
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  setFirstName: () => {},
  setLastName: () => {},
  setEmail: () => {},
  setPassword: () => {},
  setConfirmPassword: () => {},
  authData: null,
  setAuthData: () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = React.useState('');
  const [errors, setErrors] = React.useState<any>([]);
  const [isError, setIsError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [authData, setAuthData] = useState(() => {
    const storedAuth = localStorage.getItem('authData');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem('authData');
    console.log('authData:', authData, storedAuth);
  }, []);
 

  const handleLogin = (data: any) => {
    setAuthData(data);
    localStorage.setItem(AUTH_LOCAL_STORAGE, JSON.stringify(data));
  };

  const handleLogout = () => {
    setAuthData(null);
    localStorage.removeItem(AUTH_LOCAL_STORAGE);
  };

  const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  };

  const handleBlur = (field: string, value: string, setFieldErrors: any) => {    
      if (value.trim() === '' || value === '') {
          setFieldErrors((prev: any) => ({ ...prev, [field]: true }));
      } else {
          setError('');
          setFieldErrors((prev: any) => ({ ...prev, [field]: false }));
      }
  };

  return (
    <AuthContext.Provider 
    value={{
       isAuthenticated, 
       handleLogin, 
       handleLogout, 
       handleClickShowPassword,
       handleMouseDownPassword,
       handleBlur,
        error,
        errors,
        showPassword,
        setShowPassword,
        isError,
        setErrors,
        setError,
        setIsError,
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
        authData,
        setAuthData
    }}>
      {children}
    </AuthContext.Provider>
  );
};
