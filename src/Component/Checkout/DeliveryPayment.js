import React, { useContext, useEffect, useState } from "react";
import { DateContext } from "../../Component/Checkout/Datecontext"; // Import context
import "./Delivery.css";
import Extras from "./Extras";

function DeliveryPayment() {
  const { selectedDate } = useContext(DateContext); // Use context for the selected date
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    const calculateDeliveryDate = () => {
      const currentTime = new Date();
      const cutoffHour = 17; // 5 PM
      const selected = new Date(selectedDate); // Date selected by the user
      let calculatedDate = new Date(selected);

      if (selected.toDateString() === currentTime.toDateString()) {
        // If selected date is today
        if (currentTime.getHours() >= cutoffHour) {
          calculatedDate.setDate(currentTime.getDate() + 2); // Day after tomorrow
        } else {
          calculatedDate.setDate(currentTime.getDate() + 1); // Tomorrow
        }
      } else if (selected > currentTime) {
        // If selected date is in the future
        if (
          selected.toDateString() ===
          new Date(
            currentTime.getFullYear(),
            currentTime.getMonth(),
            currentTime.getDate() + 1
          ).toDateString()
        ) {
          // If the selected date is tomorrow
          if (currentTime.getHours() >= cutoffHour) {
            calculatedDate.setDate(selected.getDate() + 1); // Day after tomorrow
          }
        }
      }

      const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
      return calculatedDate.toLocaleDateString("en-US", options);
    };

    setDeliveryDate(calculateDeliveryDate());
  }, [selectedDate]);

  return (
    <div className="delivery-payment">
      <h2>Delivery & Payment</h2>
      <Extras />

      <div className="delivery-time">
        <div style={{ color: "#333333", fontWeight: "bold" }}>Expected Delivery:</div>
        <div>
          <span className="delivery-date">{deliveryDate}</span>
          <span className="delivery-time-slot"> 11:30 am - 12:30 pm</span>
        </div>
      </div>
    </div>
  );
}

export default DeliveryPayment;
