import React from 'react';
import styled from 'styled-components';
import ShowProduct from './product/ShowProduct';
import { useIntl } from 'react-intl';
import { Product } from '../type/interface/product/product';
import { SearchResultsProps } from '../type/interface/navBar/navBar';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

const NoProductsMessage = styled.p`
  font-size: 1.5rem;
  color: #BF4F74;
`;

const SearchResults: React.FC<SearchResultsProps> = ({ products, searchQuery }) => {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const intl = useIntl();

  return (
    <Container>
      {filteredProducts.length > 0 ? (
        <ProductsContainer>
          {filteredProducts.map((product: Product) => (
            <ShowProduct key={product.id} product={product} />
          ))}
        </ProductsContainer>
      ) : (
        // Utilisation de FormattedMessage pour la traduction du message
        <NoProductsMessage>
          {intl.formatMessage({ id: 'product.notFound' })}
        </NoProductsMessage>
      )}
    </Container>
  );
};

export default SearchResults;
