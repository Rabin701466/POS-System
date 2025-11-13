import React, { useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import "./ProcessPayment.css";

const ProcessPayment = ({ totalAmount = 0, onClose = () => { } }) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountTendered, setAmountTendered] = useState("");

  const handleAmountChange = (e) => {
    const amount = e.target.value;
    setAmountTendered(amount);
    const change = (Number(amount) - totalAmount).toFixed(2);
    setChangeDue(change >= 0 ? change : "0.00");
  };

  const handlePaymentComplete = () => {
    if (paymentMethod === "Cash" && Number(amountTendered) < totalAmount) {
      alert("Insufficient amount tendered");
      return;
    }
    onClose();
  };

  const changeDue = amountTendered && !isNaN(amountTendered)
    ? (Number(amountTendered) - totalAmount).toFixed(2)
    : "0.00";

  return (
    <div className="payment-container">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Process Payment</h2>
      <p className="subtitle">
        Select a payment method and complete the transaction for $
        {totalAmount.toFixed(2)}
      </p>

      <div className="total-box">
        <h3>Total Amount:</h3>
        <h3 className="amount">${totalAmount.toFixed(2)}</h3>
      </div>

      <h4>Select Payment Method</h4>
      <div className="payment-methods">
        {["Credit Card", "Cash", "Mobile Pay"].map((method) => (
          <button
            key={method}
            className={`method-btn ${paymentMethod === method ? "selected" : ""}`}
            onClick={() => setPaymentMethod(method)}
          >
            {method === "Credit Card" && <FaRegCreditCard />}
            {method === "Cash" && <BsCashCoin />}
            {method === "Mobile Pay" && <HiDevicePhoneMobile />}
            <span>{method}</span>
          </button>
        ))}
      </div>

      {paymentMethod === "Cash" && (
        <div className="cash-details">
          <h4>Cash Payment Details</h4>
          <label>Amount Tendered</label>
          <input
            type="number"
            placeholder="Enter cash amount"
            value={amountTendered}
            onChange={handleAmountChange}

          />

          <div className="summary">
            <p>
              <span>Total Due:</span> <strong>${totalAmount.toFixed(2)}</strong>
            </p>
            <p>
              <span>Cash In:</span>{" "}
              <strong className="green">
                ${amountTendered ? Number(amountTendered).toFixed(2) : "0.00"}
              </strong>
            </p>
            <p>
              <span>Change Due:</span>{" "}
              <strong className="green">${changeDue}</strong>
            </p>
          </div>
        </div>
      )}

      <div className="actions">
        <button className="cancel" onClick={onClose}>
          Cancel
        </button>
        <button className="complete" onClick={handlePaymentComplete}>Complete Payment</button>
      </div>
    </div>
  );
};

export default ProcessPayment;
