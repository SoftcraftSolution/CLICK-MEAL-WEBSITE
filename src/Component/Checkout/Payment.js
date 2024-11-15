import React from "react";
import "./payment.css";

function PaymentSummary({ orderTotal }) {
  const deliveryCharges = 40;
  const gstAndServiceTax = 8;
  const totalPayment = orderTotal + deliveryCharges + gstAndServiceTax;

  return (
    <div className="payment-summary">
      <h2>Payment Summary</h2>
      <p>Order Total: ₹{orderTotal}</p>
      <p>Delivery Charges: ₹{deliveryCharges}</p>
      <p>GST and Service Tax: ₹{gstAndServiceTax}</p>
      <h3>Total Payment: ₹{totalPayment}</h3>
      <button>Order Now</button>
    </div>
  );
}

export default PaymentSummary;
