import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './MenuItem.css';

const MenuItem = ({ item }) => {
  const navigate = useNavigate(); // Initialize navigate

  if (!item) return null;

  const handleClick = () => {
    // Navigate to ProductDetails page with item data
    navigate('/product', { state: { product: item } });
  };

  return (
    <div className="menu-item-container" onClick={handleClick}>
      {item.image && <img src={item.image} alt={item.itemName} className="menu-item-image" />}
      <h3 className="menu-item-name">{item.itemName || 'Unknown Item'}</h3>
      <div style={{ textAlign: "left", paddingBottom: "5px" }} className="menu-item-description">
        {item.description || 'A delicious item from our menu.'}
      </div>
      <div className="flexbutton-card">
        <div className="menu-item-price">₹{item.price || 'N/A'}</div>
        <button
          className="menu-item-add-to-cart"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent click handler
            alert('Add to Cart functionality');
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
