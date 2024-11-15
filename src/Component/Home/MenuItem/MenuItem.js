import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // Import Axios
import Cookies from 'js-cookie'; // Import js-cookie for cookie handling
import './MenuItem.css';

const MenuItem = ({ item }) => {
  const navigate = useNavigate(); // Initialize navigate

  if (!item) return null;

  const handleClick = () => {
    // Navigate to ProductDetails page with item data
    navigate('/product', { state: { product: item } });
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent parent click handler
    try {
      const userId = Cookies.get('userId'); // Retrieve userId from cookies
      if (!userId) {
        alert('User ID not found. Please log in.');
        return;
      }

      const itemsToAdd = [
        { itemId: item._id, quantity: 1 } // Adding current item with quantity 1
      ];

      // Sending POST request to add item to cart
      const response = await axios.post('https://clickmeal-backend.vercel.app/user/add-cart', {
        userId: userId,
        items: itemsToAdd
      });

      // Handle the response
      if (response.data && response.data.message) {
        alert(response.data.message);
      } else {
        alert('Item added to cart!');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  return (
    <div className="menu-item-container" onClick={handleClick}>
      {item.image && <img src={item.image} alt={item.itemName} className="menu-item-image" />}
      <h3 className="menu-item-name">{item.itemName || 'Unknown Item'}</h3>
      <div style={{ textAlign: 'left', paddingBottom: '5px' }} className="menu-item-description">
        {item.description || 'A delicious item from our menu.'}
      </div>
      <div className="flexbutton-card">
        <div className="menu-item-price">₹{item.price || 'N/A'}</div>
        <button
          className="menu-item-add-to-cart"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
