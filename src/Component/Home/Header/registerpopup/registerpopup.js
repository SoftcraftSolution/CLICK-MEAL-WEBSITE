import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './registerpopup.css';
import sampleImage from '../../../../assets/registerimagetopost.PNG';
import LoginPopup from '../loginpopup/loginup'; // Import the LoginPopup component

const RegisterPopup = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [showLogin, setShowLogin] = useState(false); // State to control LoginPopup visibility
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://clickmeal-backend.vercel.app/user/get-company');
        const companyList = Array.isArray(response.data.data) ? response.data.data : [];
        setCompanies(companyList);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setCompanies([]); // Set an empty array on error to avoid mapping errors
      }
    };

    fetchCompanies();
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCompanyChange = (e) => {
    setSelectedCompanyId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://clickmeal-backend.vercel.app/user/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        companyId: selectedCompanyId // Use selected companyId
      });
      console.log('User registered successfully:', response.data);

      setShowLogin(true); // Trigger the LoginPopup display
      onClose(); // Close the RegisterPopup
      navigate('/loginpopup'); // Redirect to the login page
    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
      alert('Error registering user. Please try again.');
    }
  };

  return (
    <>
      {showLogin ? (
        <LoginPopup isOpen={true} onClose={() => setShowLogin(false)} onSwitchToRegister={() => setShowLogin(false)} />
      ) : (
        <div className="register-popup-overlay" onClick={onClose}>
          <div className="register-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="register-popup-image">
              <img src={sampleImage} alt="Food Display" />
            </div>
            <div className="register-popup-form">
              <h2>Register</h2>
              <p>For Effortless Meal Reservations!</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                {/* Dropdown for Company Selection */}
                <select value={selectedCompanyId} onChange={handleCompanyChange} required>
                  <option value="" disabled>Select Company</option>
                  {companies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>

                <button style={{ backgroundColor: "#61AE5A", color: "#FFFFFF", fontWeight: "200" }} type="submit">
                  Continue
                </button>
              </form>
              <p>
                Already have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Login</a>
              </p>
              <button className="register-close-button" onClick={onClose}>X</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPopup;
