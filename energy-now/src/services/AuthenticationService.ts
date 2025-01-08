import React from 'react';

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

    console.log('responseAPI:', response);
   
    return response;
  } catch (error) {
    console.error('Error creating post:', error);
    console.log('Error creating post:', error);
    
    throw error; // Re-throw the error for handling in the component
  }
};

export const login = async (postData: IUserLogin) => {
  let data = null
  try {
    const response = await fetch(`${BASE_URL}/Authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
    .then(async (response) => {
      const contentType = response.headers.get('content-type');
      
      if (!response.ok) {
        // If the response isn't OK, handle errors
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('Server Error (JSON):', errorData.message || errorData);
          alert(errorData.message || 'An error occurred.');
        } else {
          const errorText = await response.text();
          console.error('Server Error (Text):', errorText);
          alert(errorText || 'An error occurred.');
        }
        return;
      }
  
      // If the response is OK
      data = await response.json();
      console.log('Login successful:', data);
      alert('Login successful!');
    })
    .catch((error) => {
      console.error('Network Error:', error);
      alert('A network error occurred. Please try again later.');
    });

    console.log('responseAPILoggin:', response);
    return await data;
  } catch (error) {
    console.error('Error creating post:', error);
    console.log('Error creating post2:', error);
    
    throw error; // Re-throw the error for handling in the component
  }
};
