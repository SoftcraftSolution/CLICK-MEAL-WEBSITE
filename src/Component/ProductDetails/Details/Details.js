// src/components/ProductPage/ProductDetails.js
import React from 'react';
import '../Product.css';

const ProductDetails = () => {
  return (
    <div className="product-details">
      <h1 className="product-name">Cheese Burger</h1>
      <p className="product-price">₹400</p>
      <p className="product-description">
        "A juicy, perfectly grilled patty topped with melted cheese, crisp lettuce, fresh tomato, and crunchy pickles..."
      </p>
      <h3 className="section-heading">Ingredients:</h3>
      <ul className="ingredients-list">
        <li>Beef patty (100% ground beef)</li>
        <li>Cheddar cheese</li>
        <li>Sesame seed bun</li>
        <li>Lettuce</li>
        <li>Tomato slices</li>
        <li>Ketchup</li>
        <li>Mustard</li>
      </ul>
      <h3 className="section-heading">Nutritional Information:</h3>
      <ul className="nutrition-list">
        <li>Calories: approximately 300-500</li>
        <li>Carbohydrates: 30-40 grams</li>
        <li>Total Fat: 15-25 grams</li>
        <li>Protein: 20-25 grams</li>
      </ul>
    </div>
  );
};

export default ProductDetails;
