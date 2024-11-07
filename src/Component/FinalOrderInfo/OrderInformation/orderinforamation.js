import React from "react";
import "./orderinformation.css";
import deliveryImage from '../../../assets/orderstatus.png'; // Ensure this path is correct
import tickcheck from '../../../assets/tickcheck.png';

function OrderInformation({ order, orderType }) {
  if (!order) {
    return <div className="order-information">Please select an order to view details.</div>;
  }

  if (orderType === "Ongoing") {
    return (
      <div className="order-information">
        <h2>Order Information</h2>
        <img src={deliveryImage} alt="Delivery Status" className="order-image" />
        <p>Arriving tomorrow between 11:30 - 12:30</p>
        <div style={{ fontWeight: "600" }}>Delivery Status</div>
        
        <div className="delivery-status">
          <div className="status-step completed">
            <div className="circle">&#10003;</div>
            <span>Cooking</span>
          </div>
          <div className="status-line"></div>
          <div className="status-step completed">
            <div className="circle">&#10003;</div>
            <span>Packing</span>
          </div>
          <div className="status-line"></div>
          <div className="status-step completed">
            <div className="circle">&#10003;</div>
            <span>On the way</span>
          </div>
          <div className="status-line"></div>
          <div className="status-step">
            <div className="circle"></div>
            <span>Delivered</span>
          </div>
        </div>

        <p className="status-text">Status: On the way</p>
        <p><strong>{order.title}</strong></p>
        <p>{order.description}</p>
        <p>Date: {order.date} | Time: {order.time}</p>
        <p>Total: {order.total}</p>
        <p>Order details sent on mail</p>
        <p>Order ID: <a href="#">JS210240901</a></p>
        <div className="order-actions">
          <button className="download-button">Download Invoice</button>
          <button className="order-again-button">Order Again</button>
        </div>
      </div>
    );
  }

  // Render for Previous orders
  return (
    <div className="order-information">
      <h2>Order Information</h2>
      <div className="delivereddd-status">
  <img src={tickcheck} alt="Delivered Icon" className="delivered-icon" />
  <span>Food has been delivered</span>
</div>
   <div style={{paddingTop:"10px",fontWeight:"600"}}>Order Information</div>
     <div className="order-info-bottom"> 
      <p><strong>{order.title}</strong></p>
     <div className="info-inside-flex"> 
      <div style={{color:"#646464"}}>{order.description}</div>
      <div>$400</div>
    </div>
    </div>  
    <div className="share-feedback-button">
    <span>Share Feedback</span>
  </div>
      <p>Date: {order.date} | Time: {order.time}</p>
      <p>Total: {order.total}</p>
      <p>Status: Delivered</p>
      <div className="order-actions">
        <button className="download-button">Download Invoice</button>
        <button className="order-again-button">Order Again</button>
      </div>
    </div>
  );
}

export default OrderInformation;
