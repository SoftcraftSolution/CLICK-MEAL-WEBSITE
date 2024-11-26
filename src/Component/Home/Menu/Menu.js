import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie to retrieve companyId
import { useNavigate } from 'react-router-dom';
import MenuItem from '../MenuItem/MenuItem';
import './Menu.css';

const Menu = ({ onProductClick }) => {
  const [activeTab, setActiveTab] = useState('Entrée');
  const [menuItems, setMenuItems] = useState([]);
  const [companyMeals, setCompanyMeals] = useState([]); // State for company-specific meals
  const [companyId, setCompanyId] = useState(null); // State to track companyId from cookies
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for navigation

  const categoryMapping = {
    'Entrée': '6729da4402343f97c27d61cd',
    'Plat': '6729da6802343f97c27d61cf',
    'Dessert': '6729da7b02343f97c27d61d1',
  };

  useEffect(() => {
    // Retrieve companyId from cookies
    const idFromCookies = Cookies.get('companyId');
    setCompanyId(idFromCookies);

    const fetchMenuItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const categoryId = categoryMapping[activeTab];
        const response = await axios.get(
          `https://clickmeal-backend.vercel.app/user/get-categorybyId?categoryId=${categoryId}`
        );
        if (response.data) {
          setMenuItems(response.data);
        } else {
          setMenuItems([]);
        }
      } catch (error) {
        setError('Failed to fetch menu items. Please try again.');
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCompanyMeals = async () => {
      try {
        if (!idFromCookies) {
          console.error('Company ID not found in cookies.');
          setCompanyMeals([]);
          return;
        }

        const response = await axios.get(
          `https://clickmeal-backend.vercel.app/user/get-customizemeal-by-companyId?companyId=${idFromCookies}`
        );
        if (response.data && response.data.meals) {
          setCompanyMeals(response.data.meals);
        } else {
          setCompanyMeals([]);
        }
      } catch (error) {
        console.error('Error fetching company-specific meals:', error);
      }
    };

    fetchMenuItems();
    if (idFromCookies) {
      fetchCompanyMeals(); // Fetch company-specific meals dynamically based on companyId from cookies
    }
  }, [activeTab]);

  const handleProductClick = (item) => {
    navigate('/product', { state: { product: item } });
  };

  return (
    <section className="menu-section">
      <div className="menu-title">Your Personalized Workplace Menu</div>
      <div className="menu-tabs">
        {['Entrée', 'Plat', 'Dessert'].map((tab) => (
          <button
            key={tab}
            className={`menu-tab ${activeTab === tab ? 'menu-tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="menu-items">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <MenuItem key={index} item={item} onProductClick={handleProductClick} />
          ))
        ) : (
          <p>No items available for {activeTab}</p>
        )}
      </div>

      {/* Conditionally render "Company Items" section if companyId exists */}
      {companyId && (
        <>
          <div className="menu-title" style={{ paddingTop: '25px', fontWeight: '500', fontSize: '22px' }}>
            Company Items
          </div>
          <div className="menu-items">
            {companyMeals.length > 0 ? (
              companyMeals.map((meal, index) => (
                <MenuItem key={index} item={meal} onProductClick={handleProductClick} />
              ))
            ) : (
              <p>No company-specific items available.</p>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Menu;
