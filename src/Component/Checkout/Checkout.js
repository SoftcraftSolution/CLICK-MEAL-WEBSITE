// Checkout.js
import React from "react";
import "./Checkout.css";
import DeliveryPayment from "./DeliveryPayment";
import OrderInfo from "./Orderinfo";

function Checkout() {
  return (
    <div className="checkout-container">
      <header className="checkout-header">
       
      </header>
      <main className="checkout-main-content">
        <DeliveryPayment />
        <OrderInfo /> {/* PaymentSummary will be inside OrderInfo */}
      </main>
    </div>
  );
}

export default Checkout;
