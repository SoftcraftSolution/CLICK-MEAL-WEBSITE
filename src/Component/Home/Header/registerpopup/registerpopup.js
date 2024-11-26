import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './registerpopup.css';
import sampleImage from '../../../../assets/registerimagetopost.PNG';
import LoginPopup from '../loginpopup/loginup'; // Import the LoginPopup component
import Cookies from 'js-cookie'; // Import js-cookie
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

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
  const [phoneError, setPhoneError] = useState(''); // State to store phone validation error message

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
    // Validate phone number for exactly 10 digits
    if (name === 'phoneNumber' && value.length <= 10) {
      setFormData({ ...formData, [name]: value });
      if (value.length === 10 && !/^\d{10}$/.test(value)) {
        setPhoneError('Phone number must be exactly 10 digits.');
      } else {
        setPhoneError('');
      }
    } else if (name !== 'phoneNumber') {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCompanyChange = (e) => {
    setSelectedCompanyId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneError) {
      alert('Please fix the phone number error before submitting.');
      return;
    }
    try {
      const response = await axios.post('https://clickmeal-backend.vercel.app/user/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        companyId: selectedCompanyId
      });

      // Extract userId and companyId from response
      const userId = response.data.user?._id;
      const companyId = response.data.user?.companyId;

      // Save userId and companyId in cookies
      if (userId) Cookies.set('userId', userId, { expires: 7 });
      if (companyId) Cookies.set('companyId', companyId, { expires: 7 });

      console.log('User registered successfully:', response.data.message);

      // Show success toast
      if (response.data && response.data.message) {
        toast.success(response.data.message);
      }

      setShowLogin(true); // Trigger the LoginPopup display
      onClose(); // Close the RegisterPopup
    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
      toast.error('Error registering user. Please try again.');
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} />
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
                  maxLength="10"
                  required
                />
                {phoneError && <p className="error-message">{phoneError}</p>}
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
              <p style={{margin:"0px",paddingTop:"10px"}}>
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
