import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../api/api';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { EditProductProps } from '../../type/interface/product/product';

const EditProduct: React.FC<EditProductProps> = ({ products }) => {
    const { id } = useParams<{ id: string }>();

    // Gérer le cas où id est undefined
    const productId = id ? parseInt(id) : null;

    // Trouver le produit à éditer
    const productToEdit = productId !== null ? products.find((p) => p.id === productId) : null;

    const [product, setProduct] = useState<Product | null>(productToEdit || null);
    const navigate = useNavigate();

    if (!product) {
        return <p>Produit non trouvé.</p>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const fileInput = e.target as HTMLInputElement;
            setProduct({
                ...product,
                [name]: fileInput.files ? fileInput.files[0] : null,
            } as Product);
        } else {
            setProduct({
                ...product,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            navigate('/');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };


    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Modifier le produit
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                        <TextField
                            fullWidth
                            label="Nom du produit"
                            variant="outlined"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box mb={3}>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            id="description"
                            name="description"
                            multiline
                            rows={4}
                            value={product.description}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box mb={3}>
                        <TextField
                            fullWidth
                            label="Prix"
                            variant="outlined"
                            id="price"
                            name="price"
                            type="number"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    {/* <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        className="form-control"
                    />
                </div> */}
                    <Button type="submit" variant="contained" color="primary">
                        Mettre à jour
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default EditProduct;

