import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { CardMedia } from '@mui/material';
import { CardContainer } from '../styledComponents/card/CardContainer';
import { Product, ShowProductProps } from '../../type/interface/product/product';
import { ShowMain, NameProduct, DescriptionCard } from '../styledComponents/card/CardMedia';

const ImageCardMedia = styled(CardMedia)`
  height: 350px;
  object-fit: cover;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ShowProduct: React.FC<ShowProductProps> = ({ products, product }) => {
    const { id } = useParams<{ id: string }>();

    let selectedProduct: Product | null | undefined = product;

    if (!selectedProduct && id && products) {
        const productId = parseInt(id);
        selectedProduct = products.find(p => p.id === productId) || null;
    }

    if (!selectedProduct) {
        return <Typography variant="h6" align="center">Produit non trouvé.</Typography>;
    }

    const imageUrl = `http://localhost:3001/images/${selectedProduct.image.replace('uploads/', '')}`;

    return (
        <ShowMain maxWidth="sm">
            <CardContainer>
                <NameProduct
                    title={selectedProduct.name}
                />
                <ImageCardMedia
                    as="img"
                    src={imageUrl}
                    alt={selectedProduct.name}
                    style={{ width: '100%', height: 'auto' }}
                />

                <DescriptionCard >
                    <Typography variant="body1" color="textSecondary">
                        {selectedProduct.description}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Price: ${Number(selectedProduct.price).toLocaleString()}
                    </Typography>
                </DescriptionCard>
            </CardContainer>
        </ShowMain>
    );
};

export default ShowProduct;
