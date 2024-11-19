import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for retrieving userId
import ProductGallery from './ProductGallery/Productgallery';
import ProductDetails from './Details/Details';
import ProductExtras from './ProductExtras/ProductExtras';
import QuantitySelector from './QuantitySelector/quantityselector';
import './Product.css';

const ProductPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  // State for quantity (assuming QuantitySelector will update this)
  const [quantity, setQuantity] = React.useState(1);

  if (!product) {
    return <p>No product data available. Please select a product.</p>;
  }

  const handleAddToCart = async () => {
    // Get the userId from cookies
    const userId = Cookies.get('userId'); // Retrieve userId from cookies

    if (!userId) {
      alert('User is not logged in. Please log in to add items to the cart.');
      return;
    }

    try {
      // Updated request structure to include an items array
      const response = await axios.post('https://clickmeal-backend.vercel.app/user/add-cart', {
        userId: userId,
        items: [
          {
            itemId: product.id, // Replace with the actual product ID field if different
            quantity: quantity
          }
        ]
      });

      if (response.data?.message) {
        console.log(response.data.message);
        alert('Item added to cart successfully!');
      } else {
        console.error('Unexpected response format:', response);
        alert('Error adding item to cart.');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error.response?.data || error.message);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  return (
    <div className="product-page-container">
      <div className="product-page-content">
        <ProductGallery product={product} />
        <ProductDetails product={product} />
      </div>
      <div className="product-page-sidebar">
        <ProductExtras product1={product} />
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
