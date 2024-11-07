// PaymentSummary.js
import React from "react";
import "./payment.css";

function PaymentSummary() {
  return (
    <div className="payment-summary">
      <h2>Payment Summary</h2>
      <p>Order Total: ₹400</p>
      <p>Delivery Charges: ₹40</p>
      <p>GST and Service Tax: ₹8</p>
      <h3>Total Payment: ₹448</h3>
      <button>Order Now</button>
    </div>
  );
}

export default PaymentSummary;
