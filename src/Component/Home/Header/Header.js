// import React, { useState, useEffect } from 'react';
// import './Header.css';
// import RegisterPopup from './registerpopup/registerpopup';
// import LoginPopup from './loginpopup/loginup';
// import ProfilePopup from './ProfilePopup/profilepopup';
// import CartSlider from './CartSlider/cartslider';
// import logo from '../../../assets/parislogo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './responsive.css';
// import { faCalendarAlt, faBuilding, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// const Header = () => {
//   const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
//   const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
//   const [isCartSliderOpen, setIsCartSliderOpen] = useState(false);
//   const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
//   const [companyName, setCompanyName] = useState('Default Company');
//   const [currentDate, setCurrentDate] = useState('');
//   const [selectedDate, setSelectedDate] = useState(() => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1); // Set the date to tomorrow
//     return tomorrow.toISOString().split('T')[0]; // Format as YYYY-MM-DD
//   });
//   const [cartCount, setCartCount] = useState(0); // State to track new items count

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const nameParam = urlParams.get('name');
//     if (nameParam) {
//       const formattedName = nameParam
//         .toLowerCase()
//         .split(' ')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(' ');
//       setCompanyName(formattedName);
//     }
//     const date = new Date();
//     const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
//     const formattedDate = date.toLocaleDateString('en-US', options);
//     setCurrentDate(formattedDate);
//   }, []);

//   const openRegisterPopup = () => {
//     setIsRegisterPopupOpen(true);
//     setIsLoginPopupOpen(false);
//     setIsProfilePopupOpen(false);
//   };

//   const openLoginPopup = () => {
//     setIsLoginPopupOpen(true);
//     setIsRegisterPopupOpen(false);
//     setIsProfilePopupOpen(false);
//   };

//   const openProfilePopup = () => {
//     setIsProfilePopupOpen(true);
//     setIsRegisterPopupOpen(false);
//     setIsLoginPopupOpen(false);
//   };

//   const closePopups = () => {
//     setIsRegisterPopupOpen(false);
//     setIsLoginPopupOpen(false);
//     setIsProfilePopupOpen(false);
//   };

//   const toggleCartSlider = () => {
//     setIsCartSliderOpen(!isCartSliderOpen);
//     setCartCount(0); // Reset count when cart is opened
//   };

//   const handleCartUpdate = (newItems) => {
//     setCartCount((prevCount) => prevCount + newItems);
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const todayDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

//   return (
//     <header className="header-container">
//       <a href='/'><img src={logo} alt="Click Meal Logo" className="header-logo" /></a>
//       <div className="header-controls">
//         <div className="header-date-picker">
//           <FontAwesomeIcon icon={faCalendarAlt} className="header-icon" />
//           <input
//             style={{fontFamily:"Poppins', sans-serif",border:"none",fontSize:"15px"}}
//             type="date"
//             value={selectedDate}
//             onChange={handleDateChange}
//             min={todayDate} // Restrict past dates
//             className="date-input"
//           />
//         </div>
//         <button className="header-company-selector">
//           <FontAwesomeIcon icon={faBuilding} className="header-icon" />
//           <span>{companyName}</span>
//         </button>
//         <div className="header-cart-icon">
//           <FontAwesomeIcon icon={faUser} onClick={openProfilePopup} />
//           <div className="cart-icon-container" onClick={toggleCartSlider}>
//             <FontAwesomeIcon icon={faShoppingCart} />
//             {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
//           </div>
//         </div>
//       </div>

//       <ProfilePopup 
//         isOpen={isProfilePopupOpen} 
//         onClose={closePopups} 
//         onSignIn={openRegisterPopup} 
//         onLogIn={openLoginPopup} 
//       />
//       <RegisterPopup isOpen={isRegisterPopupOpen} onClose={closePopups} onSwitchToLogin={openLoginPopup} />
//       <LoginPopup isOpen={isLoginPopupOpen} onClose={closePopups} onSwitchToRegister={openRegisterPopup} />
//       <CartSlider isOpen={isCartSliderOpen} onClose={toggleCartSlider} onCartUpdate={handleCartUpdate} />
//     </header>
//   );
// };

// export default Header;


import React, { useContext, useEffect, useState } from "react";
import { DateContext } from '../../Checkout/Datecontext';// Import context
import "./Header.css";
import RegisterPopup from "./registerpopup/registerpopup";
import LoginPopup from "./loginpopup/loginup";
import ProfilePopup from "./ProfilePopup/profilepopup";
import CartSlider from "./CartSlider/cartslider";
import logo from "../../../assets/parislogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./responsive.css";
import { faCalendarAlt, faBuilding, faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { selectedDate, setSelectedDate } = useContext(DateContext); // Use context for date state
  
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isCartSliderOpen, setIsCartSliderOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [companyName, setCompanyName] = useState("Default Company");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get("name");
    if (nameParam) {
      const formattedName = nameParam
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setCompanyName(formattedName);
    }
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value); // Update context state
  };

  const toggleCartSlider = () => {
    setIsCartSliderOpen(!isCartSliderOpen);
    setCartCount(0); // Reset count when cart is opened
  };
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

  return (
    <header className="header-container">
      <a href="/">
        <img src={logo} alt="Click Meal Logo" className="header-logo" />
      </a>
      <div className="header-controls">
        <div className="header-date-picker">
          <FontAwesomeIcon icon={faCalendarAlt} className="header-icon" />
          <input
          style={{border:"none",background:"#FFFFFF"}}
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            min={new Date().toISOString().split("T")[0]} // Restrict past dates
            className="date-input"
          />
        </div>
        <button className="header-company-selector">
          <FontAwesomeIcon icon={faBuilding} className="header-icon" />
          <span>{companyName}</span>
        </button>
        <div className="header-cart-icon">
          <FontAwesomeIcon icon={faUser} onClick={() => setIsProfilePopupOpen(true)} />
          <div className="cart-icon-container" onClick={toggleCartSlider}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </div>
        </div>
      </div>

      <ProfilePopup
        isOpen={isProfilePopupOpen}
        onSignIn={openRegisterPopup} 
        onLogIn={openLoginPopup} 
        onClose={() => setIsProfilePopupOpen(false)}
      />
      <RegisterPopup
        isOpen={isRegisterPopupOpen}
        onClose={() => setIsRegisterPopupOpen(false)}
      />
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
      />
      <CartSlider isOpen={isCartSliderOpen} onClose={() => setIsCartSliderOpen(false)} />
    </header>
  );
};

export default Header;
