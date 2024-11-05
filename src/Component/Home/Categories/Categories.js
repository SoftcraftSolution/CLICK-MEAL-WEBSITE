// src/components/Categories.js
import React from 'react';
import './Categories.css';

// Import images
import saladImage from '../../../assets/saladdcategory.png';
import hotImage from '../../../assets/hottcategory.png';
import nonVegImage from '../../../assets/nonvegcategory.png';
import vegImage from '../../../assets/hottcategory.png';
import fishImage from '../../../assets/fishcategory.png';

// Category data with imported images and names
const categories = [
  { name: 'Salad', image: saladImage },
  { name: 'Hot', image: hotImage },
  { name: 'Non Veg', image: nonVegImage },
  { name: 'Veg', image: vegImage },
  { name: 'Fish', image: fishImage },
];

const Categories = () => {
  return (
    <div className="categories-section">
      <div className="categories-header">
        <h2 className="categories-title">Categories</h2>
        <a href="#" className="view-all-link">View All</a>
      </div>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.image}  className="category-image" />
      
         
            </div>
          
        ))}
      </div>
    </div>
  );
};

export default Categories;
