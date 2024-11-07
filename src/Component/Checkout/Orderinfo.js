import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css";
import PaymentSummary from "./Payment";

function OrderInfo() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = "672a0c433a88cf636d22d6ba"; // Replace with actual userId if needed

  useEffect(() => {
    const fetchCartItems = async () => {
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
  }, []);

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
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

      {/* Payment Summary */}
      <PaymentSummary />
    </div>
  );
}

export default OrderInfo;