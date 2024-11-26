import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for retrieving userId
import ProductGallery from './ProductGallery/Productgallery';
import ProductDetails from './Details/Details';
import ProductExtras from './ProductExtras/ProductExtras';
import QuantitySelector from './QuantitySelector/quantityselector';
import './Product.css';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

const ProductPage = () => {
  const location = useLocation();
  const product = location.state?.product;

  // State for quantity (assuming QuantitySelector will update this)
  const [quantity, setQuantity] = React.useState(1);

  if (!product) {
    return <p>No product data available. Please select a product.</p>;
  }
  console.log(product);

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent parent click handler
    try {
      const userId = Cookies.get('userId'); // Retrieve userId from cookies
      if (!userId) {
        // Display custom error toast with red background
        toast.error('Register yourself first', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          className: 'custom-toast-error' // Apply custom class for styling
        });
        return;
      }

      const itemsToAdd = [
        { itemId: product._id, quantity: quantity } // Add item with selected quantity
      ];

      console.log(itemsToAdd);
      // Sending POST request to add item to cart
      const response = await axios.post('https://clickmeal-backend.vercel.app/user/add-cart', {
        userId: userId,
        items: itemsToAdd
      });

      // Handle the response
      if (response.data && response.data.message) {
        toast.success(response.data.message); // Show success toast with server response
      } else {
        toast.success('Item added to cart!'); // Show success toast with default message
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart. Please try again.'); // Show error toast
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

      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={true}
        closeButton={false}
        pauseOnHover={false}
      />
    </div>
  );
};

export default ProductPage;
