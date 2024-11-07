// DeliveryPayment.js
import React from "react";
import "./Delivery.css";
import Extras from "./Extras";

function DeliveryPayment() {
  return (
    <div className="delivery-payment">
      <h2>Delivery & Payment</h2>
      <Extras />
      <div className="delivery-time">
        <div>Tomorrow between 11:30 - 12:30 AM</div>
      </div>
      <div className="additional-items">
        <p>Is there else anything you want to buy? <span>Add +</span></p>
      </div>
    </div>
  );
}

export default DeliveryPayment;
