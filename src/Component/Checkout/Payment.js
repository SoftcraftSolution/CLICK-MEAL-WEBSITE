import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie to get userId from cookies
import "./payment.css";

function PaymentSummary({ orderTotal, selectedExtras = {} }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);

  const deliveryCharges = 40;
  const gstAndServiceTax = 8;

  const userId = Cookies.get("userId"); // Retrieve userId from cookies

  // Recalculate total payment whenever `orderTotal` changes
  useEffect(() => {
    const calculatedTotal = orderTotal + deliveryCharges + gstAndServiceTax;
    setTotalPayment(calculatedTotal);
  }, [orderTotal]);

  // Fetch cart items on component mount
  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `https://clickmeal-backend.vercel.app/user/my-cart?userId=${userId}`
      );

      if (response.data.cartItems) {
        setCartItems(response.data.cartItems);
      } else {
        setError("No items found in the cart.");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to fetch cart items. Please try again.");
    }
  };

  const handleOrderNow = async () => {
    if (cartItems.length === 0) {
      setError("No items in the cart to place an order.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous error
    setSuccess(""); // Clear previous success message

    // Safely handle `selectedExtras` in case it's undefined or null
    const extras = Object.values(selectedExtras || {}).map((extra) => ({
      extraMealId: extra._id,
      quantity: extra.quantity,
    }));
    console.log("============>");
     console.log(extras);
    // Map cart items for the API payload
    const items = cartItems.map((cartItem) => ({
      itemId: cartItem.itemId._id,
      quantity: cartItem.quantity,
    }));

    const deliveryDate = new Date().toISOString(); // Get current date in ISO format

    const orderData = {
      userId: userId,
      items: items, // Include all cart items
      extras: extras, // Include all selected extras as a separate array
      paymentMethod: "card", // Hardcoded as card; update based on user selection
      deliveryDate: deliveryDate, // Add delivery date to payload
    };

    // Log the request data for debugging
    console.log("Order Data being sent:", orderData);

    try {
      const response = await axios.post(
        "https://clickmeal-backend.vercel.app/user/order-place",
        orderData
      );

      console.log("Order Response:", response.data); // Debugging: Log API response
      if (response.data.message === "Order created successfully.") {
        setSuccess("Order placed successfully!");
      } else {
        setError("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      setError("An error occurred while placing the order.");
    } finally {
      setLoading(false); // Stop the loading indicator
    }
  };

  return (
    <div className="payment-summary">
      <h2>Payment Summary</h2>
      <p>Order Total: ₹{orderTotal}</p>
      <p>Delivery Charges: ₹{deliveryCharges}</p>
      <p>GST and Service Tax: ₹{gstAndServiceTax}</p>
      <h3>Total Payment: ₹{totalPayment}</h3>

      {loading ? (
        <p>Processing your order...</p>
      ) : (
        <button onClick={handleOrderNow}>Order Now</button>
      )}

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default PaymentSummary;
