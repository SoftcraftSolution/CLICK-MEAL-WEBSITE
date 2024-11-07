// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Home/Header/Header';
import Banner from './Component/Home/Banner/Banner';
import Categories from './Component/Home/Categories/Categories';
import Menu from './Component/Home/Menu/Menu';
import ProductPage from './Component/ProductDetails/Product';
import Practise from './Component/Checkout/Checkout';
import './App.css';
import FinalOrder from './Component/FinalOrderInfo/Finalorder';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set the clicked product
  };

  const handleBackToMenu = () => {
    setSelectedProduct(null); // Clear selected product to return to main menu
  };

  return (
    <Router>
      <div className="App">
        {/* Header is outside of Routes, so it appears on all pages */}
        <Header />

        <Routes>
          {/* Main Page Route */}
          <Route
            path="/"
            element={
              selectedProduct ? (
                <ProductPage product={selectedProduct} onBack={handleBackToMenu} />
              ) : (
                <>
                  <Banner />
                  <Categories />
                  <Menu onProductClick={handleProductClick} />
                </>
              )
            }
          />

          {/* Practise Route */}
          <Route path="/pract" element={<Practise />} />
          <Route path="/final" element={<FinalOrder/>} />
          <Route path="/product" element={<ProductPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
