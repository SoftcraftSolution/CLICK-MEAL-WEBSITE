// src/components/Home/MenuItem/MenuItem.js
import React from 'react';
import './MenuItem.css';

const MenuItem = ({ item, onProductClick }) => {
  if (!item) return null;

  const handleClick = () => {
    onProductClick(item); // Call onProductClick with item details
  };

  return (
    <div className="menu-item-container" onClick={handleClick}>
      <h3 className="menu-item-name">{item.name || 'Unknown Item'}</h3>
      <p className="menu-item-description">{item.description || 'A delicious item from our menu.'}</p>
      <div className="menu-item-price">₹{item.price || 'N/A'}</div>
      <button
        className="menu-item-add-to-cart"
        onClick={(e) => e.stopPropagation()} // Prevents onProductClick when Add to Cart is clicked
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem;
