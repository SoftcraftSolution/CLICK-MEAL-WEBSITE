// src/components/ProductPage/QuantitySelector.js
import React, { useState } from 'react';
import '../Product.css';

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="quantity-selector">
      <h3>Select Quantity</h3>
      <div className="quantity-controls">
        <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
    </div>
  );
};

export default QuantitySelector;
