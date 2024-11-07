import React from "react";
import "./myorders.css";
import burgerImage from '../../../assets/salad.png'; // Replace with your image
import pizzaImage from '../../../assets/salad.png'; // Replace with your image

function MyOrders({ onOrderClick }) {
  const ongoingOrders = [
    {
      id: 1,
      title: "Cheese Burger",
      description: "Andhra curry, a staple...",
      date: "8 Oct, 2024",
      time: "07:14 PM",
      total: "₹400",
      image: burgerImage,
    },
    {
      id: 2,
      title: "Corn Pizza",
      description: "Andhra curry, a staple...",
      date: "8 Oct, 2024",
      time: "07:14 PM",
      total: "₹400",
      image: pizzaImage,
    },
  ];

  const previousOrders = [
    {
      id: 3,
      title: "Veg Biryani",
      description: "Delicious spicy rice...",
      date: "1 Oct, 2024",
      time: "05:30 PM",
      total: "₹350",
      image: burgerImage,
    },
    {
      id: 4,
      title: "Paneer Butter Masala",
      description: "Paneer cooked in butter gravy...",
      date: "28 Sep, 2024",
      time: "06:00 PM",
      total: "₹500",
      image: pizzaImage,
    },
  ];

  const [activeTab, setActiveTab] = React.useState("Ongoing");
  const [orders, setOrders] = React.useState(ongoingOrders);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setOrders(tab === "Ongoing" ? ongoingOrders : previousOrders);
  };

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
            key={order.id}
            className="order-item"
            onClick={() => onOrderClick(order, activeTab)}
          >
            <img src={order.image} alt={order.title} className="order-image" />
            <div className="order-details">
              <div style={{ fontWeight: "700" }}>{order.title}</div>
              <div>{order.description}</div>
              <div className="order-flex">
                <div>
                  {order.date}, {order.time}
                </div>
                <div className="order-total">Total: {order.total}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
