// src/components/ProductPage/ProductExtras.js
import React from 'react';
import './productextra.css';
import extraImage from '../../../assets/burgerphoto.png';

const ProductExtras = () => {
  return (
    <div className="product-extras">
        <div style={{fontWeight:"700",fontSize:"24px"
        }}>Cheese Burger</div>
        <div style={{fontWeight:"700",fontWeight:"20px"}}>$400</div>
      <div className="extras-header">
        <h3 className="extras-title">Add Extras</h3>
        <a href="#" className="view-all-link">View All</a>
      </div>
      <div className="extra-item">
        <img src={extraImage} alt="Extra item" className="extra-image" />
        <div className="extra-item-details">
          <p className="extra-item-name">Cheese Burger</p>
          <p className="extra-item-description">Andhra curry, a staple from the southern Indian state.</p>
          <div className="extra-item-bottom">
            <button className="add-to-cart-small">Add to Cart</button>
            <p className="extra-item-price">₹400</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductExtras;
