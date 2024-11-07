import React, { useState } from 'react';
import './Header.css';
import RegisterPopup from './registerpopup/registerpopup';
import LoginPopup from './loginpopup/loginup';
import ProfilePopup from './ProfilePopup/profilepopup'; // Import your ProfilePopup component
import CartSlider from './CartSlider/cartslider';
import logo from '../../../assets/parislogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBuilding, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isCartSliderOpen, setIsCartSliderOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false); // New state for Profile popup

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
      <img src={logo} alt="Click Meal Logo" className="header-logo" />
      <div className="header-controls">
        <button className="header-date-picker">
          <FontAwesomeIcon icon={faCalendarAlt} className="header-icon" />
          <span>Tuesday, 21 Nov</span>
        </button>
        <button className="header-company-selector">
          <FontAwesomeIcon icon={faBuilding} className="header-icon" />
          <span>Tata Consultation</span>
        </button>
        <div className="header-cart-icon">
          <FontAwesomeIcon icon={faUser} onClick={openProfilePopup} /> {/* Opens Profile Popup */}
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
