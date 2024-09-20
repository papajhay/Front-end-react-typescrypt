import styled from 'styled-components';
import { CardContent, Container, CardHeader, CardMediaProps  } from '@mui/material';

export const CardMedia = styled.img`
    cursor: pointer;
    width: 100%;
    height: 250px;
    object-fit: cover
    border-radius: 10px;
`;

export const ContentCard = styled(CardContent)`
    flex-grow: 1;
`;

export const PaginationContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

export const ShowMain = styled(Container)`
    margin-top: 15px;
`;

export const NameProduct = styled(CardHeader)`
    text-align: center;
`;

export const DescriptionCard = styled(CardContent)`
    text-align: center;
`