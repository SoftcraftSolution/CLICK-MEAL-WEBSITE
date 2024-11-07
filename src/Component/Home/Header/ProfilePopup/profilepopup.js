import React from 'react';
import './profilepopup.css';
import myorder from '../../../../assets/myorder.png';
import heart from '../../../../assets/heart.png';
import gift from '../../../../assets/gift.png';
import help from '../../../../assets/help.png';
import terms from '../../../../assets/terms.png';
import privacy from '../../../../assets/privacy.png';

const ProfilePopup = ({ isOpen, onClose, onSignIn, onLogIn }) => {
  if (!isOpen) return null;

  return (
    <div className="profile-popup">
      <div className="profile-popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="header-buttons">
          <button className="sign-in-profile" onClick={onSignIn}>Sign In</button>
          <button className="profile-button" onClick={onLogIn}>Log In</button>
        </div>
        <div className="profile-options">
          
          <p><img src={myorder} alt="My Orders" className="profile-icon" /> My Orders</p>
          <p><img src={heart} alt="Favorites" className="profile-icon" /> Favorites</p>
          <p><img src={gift} alt="Rewards" className="profile-icon" /> Rewards</p>
          <p><img src={help} alt="Need Help" className="profile-icon" /> Need Help</p>
          <p><img src={terms} alt="Terms & Conditions" className="profile-icon" /> Terms & Conditions</p>
          <p><img src={privacy} alt="Privacy Policy" className="profile-icon" /> Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
