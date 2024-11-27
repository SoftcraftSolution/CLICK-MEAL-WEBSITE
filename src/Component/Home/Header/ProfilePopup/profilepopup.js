import React from "react";
import "./profilepopup.css";
import { useNavigate } from "react-router-dom";
import myorder from "../../../../assets/myorder.png";
import heart from "../../../../assets/heart.png";
import gift from "../../../../assets/gift.png";
import help from "../../../../assets/help.png";
import terms from "../../../../assets/terms.png";
import privacy from "../../../../assets/privacy.png";
import logoutclick from "../../../../assets/logoutclick.png";
import Cookies from "js-cookie"; // Import js-cookie for cookie handling

const ProfilePopup = ({ isOpen, onClose, onSignIn, onLogIn }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigation = () => {
    navigate("/myorder");
    onClose();
  };

  const handleLogout = () => {
    // Remove all relevant cookies
    Cookies.remove("userId");
    Cookies.remove("companyId");
    Cookies.remove("companyName");

    // Navigate to the home page
    navigate("/");

    // Close the profile popup
    onClose();
  };

  return (
    <div className="profile-popup">
      <div className="profile-popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {!Cookies.get("userId") ? (
          <div className="header-buttons">
            <button className="sign-in-profile" onClick={onSignIn}>
              Sign Up
            </button>
            <button className="profile-button" onClick={onLogIn}>
              Log In
            </button>
          </div>
        ) : null}
        <div
          className={`profile-options ${Cookies.get("userId") ? "" : "profile-after-id"}`}
        >
          <p onClick={handleNavigation}>
            <img src={myorder} alt="My Orders" className="profile-icon" /> My Orders
          </p>
          <p>
            <img src={heart} alt="Favorites" className="profile-icon" /> Favorites
          </p>
          <p>
            <img src={gift} alt="Rewards" className="profile-icon" /> Rewards
          </p>
          <p>
            <img src={help} alt="Need Help" className="profile-icon" /> Need Help
          </p>
          <p>
            <img src={terms} alt="Terms & Conditions" className="profile-icon" /> Terms & Conditions
          </p>
          <p>
            <img src={privacy} alt="Privacy Policy" className="profile-icon" /> Privacy Policy
          </p>
          {Cookies.get("userId") && (
            <p onClick={handleLogout}>
              <img src={logoutclick} alt="Logout" className="profile-icon" /> Logout
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
