import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Cart.css";

const CartSummary = () => {
  const Navigate = useNavigate();
  const { state } = useLocation();
  const cart = state?.cart || [];
  const onGoBack = () => {
    Navigate("/home");
  };
  return (
    <div>
      <h2>Cart Summary</h2>
      <span className="back-icon" onClick={() => onGoBack()}>
        Back{" "}
      </span>
      <div className="cart-grid">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.ProductImagePath} alt={item.ProductName} />
            <div>
              <p>Product Name: {item.ProductName}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartSummary;
