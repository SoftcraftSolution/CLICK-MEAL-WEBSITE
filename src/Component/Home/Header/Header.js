import React, { useState, useEffect } from 'react';
import './Header.css';
import RegisterPopup from './registerpopup/registerpopup';
import LoginPopup from './loginpopup/loginup';
import ProfilePopup from './ProfilePopup/profilepopup';
import CartSlider from './CartSlider/cartslider';
import logo from '../../../assets/parislogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './responsive.css';
import { faCalendarAlt, faBuilding, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isCartSliderOpen, setIsCartSliderOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [companyName, setCompanyName] = useState('Default Company'); // Initial state

  useEffect(() => {
    // Extract 'name' parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('name');

    // Convert to Pascal case if the 'name' parameter exists
    if (nameParam) {
      const formattedName = nameParam
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setCompanyName(formattedName);
    }
  }, []);

  const openRegisterPopup = () => {
    setIsRegisterPopupOpen(true);
    setIsLoginPopupOpen(false);
    setIsProfilePopupOpen(false);
  };

  const openLoginPopup = () => {
    setIsLoginPopupOpen(true);
    setIsRegisterPopupOpen(false);
    setIsProfilePopupOpen(false);
  };

  const openProfilePopup = () => {
    setIsProfilePopupOpen(true);
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(false);
  };

  const closePopups = () => {
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsProfilePopupOpen(false);
  };

  const toggleCartSlider = () => {
    setIsCartSliderOpen(!isCartSliderOpen);
  };

  return (
    <header className="header-container">
      <a href='/'><img src={logo} alt="Click Meal Logo" className="header-logo" /></a>
      <div className="header-controls">
        <button className="header-date-picker">
          <FontAwesomeIcon icon={faCalendarAlt} className="header-icon" />
          <span>Tuesday, 21 Nov</span>
        </button>
        <button className="header-company-selector">
          <FontAwesomeIcon icon={faBuilding} className="header-icon" />
          <span>{companyName}</span>
        </button>
        <div className="header-cart-icon">
          <FontAwesomeIcon icon={faUser} onClick={openProfilePopup} />
          <FontAwesomeIcon icon={faShoppingCart} onClick={toggleCartSlider} />
        </div>
      </div>

      <ProfilePopup 
        isOpen={isProfilePopupOpen} 
        onClose={closePopups} 
        onSignIn={openRegisterPopup} 
        onLogIn={openLoginPopup} 
      />
      <RegisterPopup isOpen={isRegisterPopupOpen} onClose={closePopups} onSwitchToLogin={openLoginPopup} />
      <LoginPopup isOpen={isLoginPopupOpen} onClose={closePopups} onSwitchToRegister={openRegisterPopup} />
      <CartSlider isOpen={isCartSliderOpen} onClose={toggleCartSlider} />
    </header>
  );
};

export default Header;
