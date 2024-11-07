import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productextra.css';
import extraImage from '../../../assets/burgerphoto.png';

const ProductExtras = ({ product1 }) => { // Pass itemId as a prop or define it dynamically
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId') || ''; // Retrieve userId from localStorage or use an empty string as fallback

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!product1) {
        setError('No item ID provided.');
        setLoading(false);
        return;
      }
      // console.log(itemId+"----itemID");

      try {
        const response = await axios.get(`https://clickmeal-backend.vercel.app/user/item-by-id/?itemId=${product1._id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [product1._id]); // Depend on itemId so it fetches new data when itemId changes

  const handleAddToCart = async () => {
    if (!userId) {
      alert('User ID is missing. Please log in.');
      return;
    }

    try {
      const payload = {
        userId,
        items: [
          { itemId: product?._id, quantity: 2 } // Use dynamic product._id here
        ]
      };

      const response = await axios.post('https://clickmeal-backend.vercel.app/user/add-cart', payload);
      console.log('Add to Cart Response:', response.data);

      if (response.data && response.data.message) {
        alert(response.data.message); // Display success message
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add items to cart. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No product details available.</p>;
  }

  return (
    <div className="product-extras">
      <div style={{ fontWeight: "700", fontSize: "24px" }}>{product.itemName}</div>
      <div style={{ fontWeight: "700", fontSize: "20px" }}>₹{product.price}</div>
      <div className="extras-header">
        <h3 className="extras-title">Add Extras</h3>
        <a href="#" className="view-all-link">View All</a>
      </div>
      <div className="extra-item">
        <img src={product.image || extraImage} alt="Extra item" className="extra-image" />
        <div className="extra-item-details">
          <p className="extra-item-name">{product.itemName}</p>
          <p className="extra-item-description">{product.description}</p>
          <div className="extra-item-bottom">
            <button className="add-to-cart-small" onClick={handleAddToCart}>Add to Cart</button>
            <p className="extra-item-price">₹{product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductExtras;
