import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch subcategories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://clickmeal-backend.vercel.app/user/subcategory-list');
        if (response.data && response.data.data) {
          setCategories(response.data.data);
        }
      } catch (error) {
        setError('Failed to fetch categories. Please try again later.');
        console.error('Error fetching subcategories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories-section">
      <div className="categories-header">
        <h2 className="categories-title">Categories</h2>
        
      </div>
      {isLoading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="categories-container">
          {categories.slice(0, 5).map((category) => ( // Limit to 5 categories
            <div key={category._id} className="category-card">
              <img src={category.image} alt={category.name} className="category-image" />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
