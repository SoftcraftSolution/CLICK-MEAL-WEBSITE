import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Extras.css";

function Extras({selectedExtras, setSelectedExtras}) {
  const extraListRef = useRef(null);
  const [extraItems, setExtraItems] = useState([]);
  // const [selectedExtras, setSelectedExtras] = useState({}); // Manage selected extras

  // Fetch extras from the API
  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const response = await axios.get(
          "https://clickmeal-backend.vercel.app/user/get-extrameal"
        );
        if (response.data && response.data.data) {
          setExtraItems(response.data.data); // Set the data from the API
        }
      } catch (error) {
        console.error("Error fetching extras:", error);
      }
    };

    fetchExtras();
  }, []);

  // Function to handle adding extras
  const handleAddExtra = (extra) => {
    setSelectedExtras((prevExtras) => ({
      ...prevExtras,
      [extra._id]: {
        ...extra,
        quantity: (prevExtras[extra._id]?.quantity || 0) + 1,
      },
    }));
  };

  const handleIncrementExtra = (id) => {
    setSelectedExtras((prevExtras) => ({
      ...prevExtras,
      [id]: {
        ...prevExtras[id],
        quantity: prevExtras[id].quantity + 1,
      },
    }));
  };

  const handleDecrementExtra = (id) => {
    setSelectedExtras((prevExtras) => {
      const newExtras = { ...prevExtras };
      if (newExtras[id].quantity === 1) {
        delete newExtras[id];
      } else {
        newExtras[id].quantity -= 1;
      }
      return newExtras;
    });
  };

  // Function to handle touch and drag for scrolling
  const handleTouchMove = (e) => {
    if (e.targetTouches.length > 0) {
      const touch = e.targetTouches[0];
      extraListRef.current.scrollLeft -= touch.clientX - extraListRef.current.startX;
      extraListRef.current.startX = touch.clientX;
    }
  };

  const handleTouchStart = (e) => {
    if (e.targetTouches.length > 0) {
      const touch = e.targetTouches[0];
      extraListRef.current.startX = touch.clientX;
    }
  };

  return (
    <div className="extras">
      <h3>
        Add Extras
        <a href="#">View All</a>
      </h3>
      <div
        className="extra-list"
        ref={extraListRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {extraItems.length > 0 ? (
          extraItems.map((item) => (
            <div className="extra-item" key={item._id}>
              <img src={item.image} alt={item.name} />
              <div className="extra-info">
                <div style={{ color: "#000000", fontWeight: "600" }}>{item.name}</div>
                <p>{item.description}</p>
                <button onClick={() => handleAddExtra(item)}>Add</button>
              </div>
              <span className="extra-price">₹{item.price}</span>
            </div>
          ))
        ) : (
          <div className="no-extras">No extras available</div>
        )}
      </div>

      {/ Selected Extras Section /}
      {Object.values(selectedExtras).length > 0 && (
        <div className="selected-extras">
          <h4>Selected Extras:</h4>
          {Object.values(selectedExtras).map((extra) => (
            <div key={extra._id} className="selected-extra-item">
              <span>{extra.name} (x{extra.quantity})</span>
              <div className="extra-controls">
                <button onClick={() => handleIncrementExtra(extra._id)}>+</button>
                <button onClick={() => handleDecrementExtra(extra._id)}>-</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Extras;
