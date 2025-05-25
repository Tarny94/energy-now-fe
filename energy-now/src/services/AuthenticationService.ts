import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface IUserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

const BASE_URL = 'https://localhost:7045/api';

export const registration = async (postData: IUserRegistration) => {
  try {
    const response = await fetch(`${BASE_URL}/Authentication/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    }).then((res) => res.json()).catch((err) => console.log('err:', err));
   
    return response;
  } catch (error) {
    console.error('Error creating post:', error);
    console.log('Error creating post:', error);
    
    throw error;
  }
};

export const login = async (postData: IUserLogin) => {
  try {
    const response = await fetch(`${BASE_URL}/Authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return errorText;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
  }
};
