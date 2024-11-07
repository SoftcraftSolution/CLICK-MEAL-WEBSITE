import React from 'react';
import './loginup.css';
import sampleImage from '../../../../assets/registerimagetopost.PNG'; // Replace with the correct path to your image

const LoginPopup = ({ isOpen, onClose, onSwitchToRegister }) => {
  if (!isOpen) return null;

  return (
    <div className="login-popup-overlay" onClick={onClose}>
      <div className="login-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="login-popup-image">
          <img src={sampleImage} alt="Food Display" />
        </div>
        <div className="login-popup-form">
          <h2>Login</h2>
          <p>Log In to Schedule Your Next Meal</p>
          <form>
            <input type="email" placeholder="Email address" required />
            <input type="password" placeholder="Enter Password" required />
            <button style={{backgroundColor:"#61AE5A",color:"#FFFFFF",fontWeight:"100"}} type="submit">Continue</button>
          </form>
          <p>
            Don’t have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>Register</a>
          </p>
          <button className="login-close-button" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
