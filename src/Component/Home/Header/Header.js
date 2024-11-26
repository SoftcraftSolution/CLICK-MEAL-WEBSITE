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
