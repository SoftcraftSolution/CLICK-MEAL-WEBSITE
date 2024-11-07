import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access state
import ProductGallery from './ProductGallery/Productgallery';
import ProductDetails from './Details/Details';
import ProductExtras from './ProductExtras/ProductExtras';
import QuantitySelector from './QuantitySelector/QuantitySelector';
import './Product.css';

const ProductPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <p>No product data available. Please select a product.</p>;
  }

  return (
    <div className="product-page-container">
      <div className="product-page-content">
        <ProductGallery product={product} />
        <ProductDetails product={product} />
      </div>
      <div className="product-page-sidebar">
        <ProductExtras product1={product} />
        <QuantitySelector />
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;
