import React, { useState } from "react";
import MyOrders from "./MyOrders/myorders";
import OrderInformation from "./OrderInformation/orderinforamation";
import "./Finalorder.css";

function FinalOrder() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderType, setOrderType] = useState("Ongoing"); // Track the active order type

  // Handler to update the selected order and type
  const handleOrderSelect = (order, type) => {
    setSelectedOrder(order);
    setOrderType(type);
  };

  return (
    <div className="final-order-container">
      <MyOrders onOrderClick={handleOrderSelect} />
      <OrderInformation order={selectedOrder} orderType={orderType} />
    </div>
  );
}

export default FinalOrder;
