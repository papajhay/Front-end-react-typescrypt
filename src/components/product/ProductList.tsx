import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { CardContainer } from '../styledComponents/card/CardContainer'; 
import { CardMedia, ContentCard, PaginationContainer } from '../styledComponents/card/CardMedia';
import { FormattedMessage } from 'react-intl';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LoadingSpinner from '../LoadingSpinner';
import { ProductListProps } from '../../type/interface/product/product';

const ITEMS_PER_PAGE = 8;

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // État de chargement

    // Simuler un chargement de données avec un useEffect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Mettre à jour l'état de chargement après un délai
        }, 2000); // Remplacez par le temps de chargement réel ou ajustez selon vos besoins

        return () => clearTimeout(timer);
    }, []);

    // Calculer les produits pour la page courante
    const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Gestion du changement de page
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    // Afficher le spinner si isLoading est true
    if (isLoading) {
        return (<LoadingSpinner/>);
    }

    return (
        <Container>
            <Typography variant="h3" component="div" className="m-3">
                <FormattedMessage id="products.listTitle" defaultMessage="List of our products" />
            </Typography>
            <Grid container spacing={3}>
                {currentProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <a 
                            href={`/product/${product.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }} 
                        >
                            <CardContainer>
                                <CardMedia
                                    src={`http://localhost:3001/images/${product.image.replace('uploads/', '')}`}
                                    alt={product.name}
                                />
                                <ContentCard>
                                    <Typography variant="h5" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                    <Typography variant="body1" color="text.primary">
                                        ${Number(product.price).toLocaleString()} 
                                    </Typography>
                                </ContentCard>
                            </CardContainer>
                        </a>
                    </Grid>
                ))}
            </Grid>
            <PaginationContainer>
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(products.length / ITEMS_PER_PAGE)}
                        page={currentPage}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}
                        boundaryCount={1}
                        siblingCount={0}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                {...item}
                            />
                        )}
                    />
                </Stack>
            </PaginationContainer>
        </Container>
    );
};

export default ProductList;
