// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../Product.css';

// const ProductGallery = () => {
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
//         setError('Failed to load product gallery. Please try again.');
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
//     return <p>No product image available.</p>;
//   }

//   return (
//     <div className="product-gallery">
//       <div className="gallery-thumbnails">
//         <img src={product.image} alt={`${product.itemName} Thumbnail`} className="thumbnail" />
//         {/* You can add more thumbnails or alternate images if available */}
//       </div>
//       <img src={product.image} alt={product.itemName} className="main-image" />
//     </div>
//   );
// };

// export default ProductGallery;
import React from 'react';
import '../Product.css';

const ProductGallery = ({ product }) => {
  if (!product) {
    return <p>No product image available.</p>;
  }

  return (
    <div className="product-gallery">

      <img style={{padding:"0px"}} src={product.image} alt={product.itemName} className="main-image" />
    </div>
  );
};

export default ProductGallery;
