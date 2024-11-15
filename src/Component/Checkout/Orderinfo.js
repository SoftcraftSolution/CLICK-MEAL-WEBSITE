import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import "./Order.css";
import PaymentSummary from "./Payment";

function OrderInfo() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch userId from cookies
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://clickmeal-backend.vercel.app/user/my-cart?userId=${userId}`);
        if (response.data && response.data.cartItems) {
          setCartItems(response.data.cartItems);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to load cart items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.itemId.price * item.quantity, 0);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="order-info">
      <h2>Order Information</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div className="order-item" key={item._id}>
            <img src={item.itemId.image} alt={item.itemId.itemName} />
            <div className="order-details">
              <div style={{ paddingBottom: "15px", fontWeight: "600" }}>{item.itemId.itemName}</div>
              <div style={{ paddingBottom: "8px", fontSize: "12px" }}>{item.itemId.description}</div>
              <div style={{ display: "flex", gap: "10px" }} className="order-quantity-control">
                <button className="minus-button" onClick={() => updateQuantity(item._id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, 1)}>+</button>
              </div>
            </div>
            <span className="item-price">₹{item.itemId.price}</span>
          </div>
        ))
      ) : (
        <p>No items in the cart.</p>
      )}

      {/* Payment Summary with total price passed as a prop */}
      <PaymentSummary orderTotal={calculateTotalPrice()} />
    </div>
  );
}

export default OrderInfo;
