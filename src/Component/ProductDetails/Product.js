// src/components/ProductPage/ProductPage.js
import React from 'react';
import ProductGallery from './ProductGallery/Productgallery';
import ProductDetails from './Details/Details';
import ProductExtras from './ProductExtras/ProductExtras';
import QuantitySelector from './QuantitySelector/quantityselector';
import './Product.css';

const ProductPage = () => {
  return (
    <div className="product-page-container">
      <div className="product-page-content">
        <ProductGallery />
        <ProductDetails />
      </div>
      <div className="product-page-sidebar">
        <ProductExtras />
        <QuantitySelector />
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;
