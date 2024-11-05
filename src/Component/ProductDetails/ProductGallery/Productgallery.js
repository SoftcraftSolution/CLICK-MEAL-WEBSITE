// src/components/ProductPage/ProductGallery.js
import React from 'react';
import '../Product.css';
import mainImage from '../../../assets/burgerphoto.png';
import thumb1 from '../../../assets/burgerphoto.png';
import thumb2 from '../../../assets/burgerphoto.png';

const ProductGallery = () => {
  return (
    <div className="product-gallery">
      <div className="gallery-thumbnails">
        <img src={thumb1} alt="Thumbnail 1" className="thumbnail" />
        <img src={thumb2} alt="Thumbnail 2" className="thumbnail" />
      </div>
      <img src={mainImage} alt="Main Product" className="main-image" />
    </div>
  );
};

export default ProductGallery;
