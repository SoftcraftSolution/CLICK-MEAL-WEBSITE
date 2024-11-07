import React from 'react';
import './registerpopup.css';
import sampleImage from '../../../../assets/registerimagetopost.PNG';

const RegisterPopup = ({ isOpen, onClose, onSwitchToLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="register-popup-overlay" onClick={onClose}>
      <div className="register-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="register-popup-image">
          <img src={sampleImage} alt="Food Display" />
        </div>
        <div className="register-popup-form">
          <h2>Register</h2>
          <p>For Effortless Meal Reservations!</p>
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="tel" placeholder="Phone Number" required />
            <input type="email" placeholder="Email address" required />
            <input type="password" placeholder="Create Password" required />
            <button style={{ backgroundColor: "#61AE5A", color: "#FFFFFF", fontWeight: "200" }} type="submit">Continue</button>
          </form>
          <p>
            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Login</a>
          </p>
          <button className="register-close-button" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPopup;
