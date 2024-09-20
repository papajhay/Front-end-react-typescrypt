import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import NavBar from './partials/NavBar';
import ProductList from './components/product/ProductList';
import AddProduct from './components/product/AddProduct';
import ShowProduct from './components/product/ShowProduct';
import SearchResults from './components/SearchResult';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import { SnackbarProvider } from './context/SnackbarContext';
import { ProductProvider } from './context/ProductContext';
import { useLanguage } from './LanguageProvider';
import enMessages from './locale/en.json'; 
import frMessages from './locale/fr.json';
import { Product } from './api/api';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { locale, switchLanguage } = useLanguage();

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error('Erreur de récupération des produits:', error),
      );
  }, []);

  // Sélectionner les messages basés sur la langue actuelle
  const messages = locale === 'en' ? enMessages : frMessages;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <SnackbarProvider>
        <ProductProvider>
          <Router>
            <NavBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              switchLanguage={switchLanguage}
            />
            <Routes>
              <Route path="/" element={<ProductList products={products} />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/product/:id" element={<ShowProduct products={products} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<SearchResults products={products} searchQuery={searchQuery} />} />
            </Routes>
          </Router>
        </ProductProvider>
      </SnackbarProvider>
    </IntlProvider>
  );
};

export default App;