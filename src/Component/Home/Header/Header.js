// src/components/Header.js
import React from 'react';
import './Header.css';
import logo from '../../../assets/parislogo.png'; // Replace with the correct path for the logo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBuilding, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
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
          <FontAwesomeIcon icon={faUser} />
          <FontAwesomeIcon icon={faShoppingCart} />
        </div>
      </div>
    </header>
  );
};

export default Header;
