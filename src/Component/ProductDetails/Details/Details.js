// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../Product.css';

// const ProductDetails = () => {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axios.get('https://clickmeal-backend.vercel.app/user/item-by-id/?itemId=672b1d12926a244f7d078f48');
//         setProduct(response.data);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//         setError('Failed to load product details. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductDetails();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!product) {
//     return <p>No product details available.</p>;
//   }

//   return (
//     <div className="product-details">
//       <h1 className="product-name">{product.itemName}</h1>
//       <p className="product-price">₹{product.price}</p>
//       <p className="product-description">{product.description}</p>
//       <h3 className="section-heading">Ingredients:</h3>
//       <ul className="ingredients-list">
//         {product.ingredients && product.ingredients.length > 0 ? (
//           product.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)
//         ) : (
//           <li>No ingredients available.</li>
//         )}
//       </ul>
//       <h3 className="section-heading">Nutritional Information:</h3>
//       <ul className="nutrition-list">
//         {product.nutritionalInfo && product.nutritionalInfo.length > 0 ? (
//           product.nutritionalInfo.map((info, index) => <li key={index}>{info}</li>)
//         ) : (
//           <li>No nutritional information available.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default ProductDetails;


import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access state
import '../Product.css';

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <p>No product details available.</p>;
  }

  return (
    <div className="product-details">
      <h1 className="product-name">{product.itemName}</h1>
      <p className="product-price">₹{product.price}</p>
      <p className="product-description">{product.description}</p>
      <h3 className="section-heading">Ingredients:</h3>
      <ul className="ingredients-list">
        {product.ingredients && product.ingredients.length > 0 ? (
          product.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)
        ) : (
          <li>No ingredients available.</li>
        )}
      </ul>
      <h3 className="section-heading">Nutritional Information:</h3>
      <ul className="nutrition-list">
        {product.nutritionalInfo && product.nutritionalInfo.length > 0 ? (
          product.nutritionalInfo.map((info, index) => <li key={index}>{info}</li>)
        ) : (
          <li>No nutritional information available.</li>
        )}
      </ul>
    </div>
  );
};

export default ProductDetails;

