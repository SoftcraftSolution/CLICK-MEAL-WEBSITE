import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Home/Header/Header';
import Banner from './Component/Home/Banner/Banner';
import Categories from './Component/Home/Categories/Categories';
import Menu from './Component/Home/Menu/Menu';
import ProductPage from './Component/ProductDetails/Product';
import Practise from './Component/Checkout/Checkout';
import LoginPopup from './Component/Home/Header/loginpopup/loginup';
import './App.css';
import Cookies from "js-cookie";
import FinalOrder from './Component/FinalOrderInfo/Finalorder';
import RegisterPopup from './Component/Home/Header/registerpopup/registerpopup'; // Import RegisterPopup component

const App = () => {

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(Cookies.get('userId')?false:true); // State to control the popup

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set the clicked product
  };

  const handleBackToMenu = () => {
    setSelectedProduct(null); // Clear selected product to return to main menu
  };

  const handleClosePopup = () => {
    setRegisterPopupOpen(false); // Close the register popup
  };

  const handleSwitchToLogin = () => {
    // Handle switching to login logic here
    console.log('Switch to login clicked');
  };

  useEffect(() => {
    // Optionally, add any logic that determines when the popup appears
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />

        {/* RegisterPopup component */}
        <RegisterPopup 
          isOpen={isRegisterPopupOpen} 
          onClose={handleClosePopup} 
          onSwitchToLogin={handleSwitchToLogin} 
        />

        <Routes>
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
          <Route path="/pract" element={<Practise />} />
          <Route path="/final" element={<FinalOrder />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/myorder" element={<FinalOrder />} />
          <Route path="/loginpopup" element={<LoginPopup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
