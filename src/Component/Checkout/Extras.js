import React, { useRef } from "react";
import "./Extras.css";
import burger from '../../assets/salad.png'; // Sample image, replace with your asset as needed.

function Extras() {
  const extraListRef = useRef(null);

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

  // Sample data for multiple cards
  const extraItems = [
    { id: 1, title: "Cheese Burger", description: "Andhra curry, a staple from the southern Indian state..", price: "₹400", img: burger },
    { id: 2, title: "Spicy Burger", description: "Delicious spicy flavors with fresh toppings..", price: "₹450", img: burger },
    { id: 3, title: "Veggie Delight", description: "A blend of garden-fresh veggies..", price: "₹350", img: burger },
    { id: 4, title: "BBQ Burger", description: "Savory BBQ sauce and juicy beef patty..", price: "₹500", img: burger },
  ];

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
        {extraItems.map((item) => (
          <div className="extra-item" key={item.id}>
            <img src={item.img} alt={item.title} />
            <div className="extra-info">
              <div style={{ color: "#000000", fontWeight: "600" }}>{item.title}</div>
              <p>{item.description}</p>
              <button>Add to Cart</button>
            </div>
            <span className="extra-price">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Extras;
