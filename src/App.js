// src/App.js
import React, { useState } from 'react';
import Header from './Component/Home/Header/Header';
import Banner from './Component/Home/Banner/Banner';
import Categories from './Component/Home/Categories/Categories';
import Menu from './Component/Home/Menu/Menu';
import ProductPage from './Component/ProductDetails/Product';
import './App.css';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set the clicked product
  };

  const handleBackToMenu = () => {
    setSelectedProduct(null); // Clear selected product to return to main menu
  };

  return (
    <div className="App">
      <Header />
      {selectedProduct ? (
        <ProductPage product={selectedProduct} onBack={handleBackToMenu} />
      ) : (
        <>
          <Banner />
          <Categories />
          <Menu onProductClick={handleProductClick} />
        </>
      )}
    </div>
  );
};

export default App;
