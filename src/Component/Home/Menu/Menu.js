// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MenuItem from '../MenuItem/MenuItem';
// import './Menu.css';

// const Menu = ({ onProductClick }) => {
//   const [activeTab, setActiveTab] = useState('Entrée');
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Mapping of category tabs to their corresponding categoryId
//   const categoryMapping = {
//     'Entrée': '6729da4402343f97c27d61cd',
//     'Plat': '6729da6802343f97c27d61cf',
//     'Dessert': '6729da7b02343f97c27d61d1'
//   };

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const categoryId = categoryMapping[activeTab];
//         const response = await axios.get(`https://clickmeal-backend.vercel.app/user/get-categorybyId?categoryId=${categoryId}`);
//         // console.log('Fetched data:', response.data[0]);
//         if (response.data) {
//           console.log("there is data in item");
//           setMenuItems(response.data);
//         } else {
//           setMenuItems([]);
//         }
//       } catch (error) {
//         setError('Failed to fetch menu items. Please try again.');
//         console.error('Error fetching menu items:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, [activeTab]);
  

//   return (
//     <section className="menu-section">
//       <div className="menu-title">Your Personalized Workplace Menu</div>
//       <div className="menu-tabs">
//         {['Entrée', 'Plat', 'Dessert'].map((tab) => (
//           <button
//             key={tab}
//             className={`menu-tab ${activeTab === tab ? 'menu-tab-active' : ''}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
//       <div className="menu-items">
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : menuItems.length > 0 ? (
//           menuItems.map((item, index) => (
//             <MenuItem key={index} item={item} onProductClick={onProductClick} />
//           ))
//         ) : (
//           <p>No items available for {activeTab}</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Menu;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import MenuItem from '../MenuItem/MenuItem';
import './Menu.css';

const Menu = ({ onProductClick }) => {
  const [activeTab, setActiveTab] = useState('Entrée');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for navigation

  const categoryMapping = {
    'Entrée': '6729da4402343f97c27d61cd',
    'Plat': '6729da6802343f97c27d61cf',
    'Dessert': '6729da7b02343f97c27d61d1'
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const categoryId = categoryMapping[activeTab];
        const response = await axios.get(`https://clickmeal-backend.vercel.app/user/get-categorybyId?categoryId=${categoryId}`);
        if (response.data) {
          setMenuItems(response.data);
        } else {
          setMenuItems([]);
        }
      } catch (error) {
        setError('Failed to fetch menu items. Please try again.');
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [activeTab]);

  const handleProductClick = (item) => {
    navigate('/product', { state: { product: item } });
  };

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
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <MenuItem key={index} item={item} onProductClick={handleProductClick} />
          ))
        ) : (
          <p>No items available for {activeTab}</p>
        )}
      </div>
    </section>
  );
};

export default Menu;
