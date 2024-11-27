import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./cartslider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartSlider = ({ isOpen, onClose, onCartUpdate = () => {} }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const userId = Cookies.get("userId");
        if (!userId) {
          throw new Error("User ID not found in cookies");
        }
        const response = await axios.get(
          `https://clickmeal-backend.vercel.app/user/my-cart?userId=${userId}`
        );
        if (response.data && response.data.cartItems) {
          setItems(response.data.cartItems);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to load cart items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  const updateQuantity = (id, amount) => {
    setItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove items with quantity 0
      return updatedItems;
    });

    if (amount > 0) {
      onCartUpdate(1); // Increment the cart count
    } else {
      onCartUpdate(-1); // Decrement the cart count
    }
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.itemId.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    onClose();
    navigate("/pract"); // Replace with your checkout route
  };

  if (!isOpen) return null;

  return (
    <div className="cart-slider-overlay" onClick={onClose}>
      <div className="cart-slider" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>My Cart</h2>
          <button className="close-button-cart" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="cart-item-count">
          <FontAwesomeIcon icon={faShoppingCart} /> You have {items.length}{" "}
          items in your Cart
        </div>

        <div className="cart-items">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <div className="all-items-title">All Items</div>
              {items.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img
                    src={item.itemId.image}
                    alt={item.itemId.itemName}
                    className="cart-item-image"
                  />
                  <div className="item-details">
                    <h4>{item.itemId.itemName}</h4>
                    <p>{item.itemId.description}</p>
                    <div className="item-controls">
                      <span className="item-price">₹{item.itemId.price}</span>
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item._id, -1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)}>
                          +
                        </button>
                      </div>
                      <span className="item-total">
                        Total: ₹{item.itemId.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="cart-footer">
          <div className="total-amount">
            <p>Total:</p>
            <h3>₹{calculateTotal()}</h3>
            <p>incl all taxes</p>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSlider;
