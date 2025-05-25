import { log } from "console";
import React, { useEffect } from "react";

const BASE_URL = 'https://localhost:7045/api';

export const getClients = async (token : string) => { 
    
    try {        
        const response = await fetch(`${BASE_URL}/Admin/client`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            const errorText = await response.text();
            return errorText;
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating post:', error);        
    }
};

export const updateClient = async (token: string, updatedRow: any) => {
    try {
        const response = await fetch(`${BASE_URL}/Admin/client/confirmation`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedRow),
        })
        
        if (!response.ok) {
            const errorText = await response.text();
            return errorText;
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating row:', error);
    }
}