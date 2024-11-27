import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./myorders.css";
import placeholderImage from "../../../assets/salad.png"; // Placeholder image

function MyOrders({ onOrderClick }) {
  const [activeTab, setActiveTab] = useState("Ongoing");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    const userId = Cookies.get("userId");
    if (!userId) {
      setError("User ID not found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://clickmeal-backend.vercel.app/user/my-order?userId=${userId}`
      );

      const fetchedOrders = response.data.orders;

      const ongoing = fetchedOrders.filter((order) =>
        ["ordered", "preparing", "out-for-delivery"].includes(order.status)
      );
      const previous = fetchedOrders.filter((order) =>
        ["completed", "canceled", "delivered"].includes(order.status)
      );

      setOrders(activeTab === "Ongoing" ? ongoing : previous);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchOrders(); // Refetch orders on tab change
  };

  useEffect(() => {
    fetchOrders(); // Initial fetch
  }, [activeTab]);

  const formatDate = (isoDate) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(isoDate).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="tabs">
        <button
          className={activeTab === "Ongoing" ? "active" : ""}
          onClick={() => handleTabChange("Ongoing")}
        >
          Ongoing
        </button>
        <button
          className={activeTab === "Previous" ? "active" : ""}
          onClick={() => handleTabChange("Previous")}
        >
          Previous
        </button>
      </div>
      <div className="orders-list">
        {orders.map((order) => (
          <div
            key={order._id}
            className="order-item"
            onClick={() => onOrderClick(order, activeTab)}
          >
            <img src={placeholderImage} alt="Order" className="order-image" />
            <div className="order-details">
              <div style={{ fontWeight: "700" }}>Order #{order.orderId}</div>
              <div>Status: {order.status}</div>
              <div>Total Price: ₹{order.totalPrice}</div>
              <div>Payment Method: {order.paymentMethod}</div>
              <div>Payment Status: {order.paymentStatus}</div>
              <div>Delivery Date: {formatDate(order.deliveryDate)}</div>
              <div>
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.itemId}>
                      <span>Item Name: {item.name}</span>
                      <span> - Quantity: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {order.extras && order.extras.length > 0 && (
                <div>
                  <strong>Extras:</strong>
                  <ul>
                    {order.extras.map((extra) => (
                      <li key={extra.extraMealId}>
                        <span>Extra Name: {extra.name}</span>
                        <span> - Quantity: {extra.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
