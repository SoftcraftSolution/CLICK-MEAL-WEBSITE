import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library
import './loginup.css';
import sampleImage from '../../../../assets/registerimagetopost.PNG'; // Replace with the correct path to your image

const LoginPopup = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://clickmeal-backend.vercel.app/user/login', {
        email: email,
        password: password
      });
      console.log('Login successful:', response.data);

      // Save the id from the response in cookies
      if (response.data?.user?.id) {
        Cookies.set('userId', response.data.user.id, { expires: 7 }); // Set cookie with 7-day expiration
      }

      onClose(); // Close the popup on successful login
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error logging in. Please try again.');
    }
  };

  return (
    <div className="login-popup-overlay" onClick={onClose}>
      <div className="login-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="login-popup-image">
          <img src={sampleImage} alt="Food Display" />
        </div>
        <div className="login-popup-form">
          <h2>Login</h2>
          <p>Log In to Schedule Your Next Meal</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              style={{ backgroundColor: "#61AE5A", color: "#FFFFFF", fontWeight: "100" }}
              type="submit"
            >
              Continue
            </button>
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
