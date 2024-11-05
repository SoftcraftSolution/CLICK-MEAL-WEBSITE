// src/components/Home/Menu/Menu.js
import React, { useState } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import './Menu.css';

const Menu = ({ onProductClick }) => {
  const [activeTab, setActiveTab] = useState('Entrée');

  const menuItems = [
    { name: 'Andhra Curry', price: 400, type: 'Entrée', description: 'A spicy curry from Andhra Pradesh' },
    { name: 'Cheese Burger', price: 400, type: 'Plat', description: 'A classic cheeseburger' },
    { name: 'Pizza', price: 1600, type: 'Dessert', description: 'Delicious pizza with toppings' },
  ];

  const filteredItems = menuItems.filter((item) => item.type === activeTab);

  return (
    <section className="menu-section">
      <div className="menu-title">Your Personalized Workplace Menu</div>
      <div className="menu-tabs">
        {['Entrée', 'Plat', 'Dessert'].map((tab) => (
          <button
            key={tab}
            className={`menu-tab ${activeTab === tab ? 'menu-tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="menu-items">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <MenuItem key={index} item={item} onProductClick={onProductClick} />
          ))
        ) : (
          <p>No items available for {activeTab}</p>
        )}
      </div>
    </section>
  );
};

export default Menu;
