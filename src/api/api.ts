import axios from 'axios';

const API_URL = 'http://localhost:3001/products';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch('API_uRL', {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};
