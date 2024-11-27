// Checkout.js

import React, { useContext, useEffect, useState } from "react";
import "./Checkout.css";
import DeliveryPayment from "./DeliveryPayment";
import OrderInfo from "./Orderinfo";

function Checkout() {
  const [selectedExtras, setSelectedExtras] = useState({});
  return (
    <div className="checkout-container">
      <header className="checkout-header">
       
      </header>
      <main className="checkout-main-content">
        <DeliveryPayment selectedExtras={selectedExtras} setSelectedExtras={setSelectedExtras} />
        <OrderInfo selectedExtras={selectedExtras}/> {/ PaymentSummary will be inside OrderInfo /}
      </main>
    </div>
  );
}

export default Checkout;