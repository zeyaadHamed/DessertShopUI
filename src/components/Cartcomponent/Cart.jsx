import React, { useState } from "react";
import "./Cart.css";
import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";

const Cart = ({ cartItems, onRemove, setCartItems }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="cart-sidebar">
      <h2>Your Cart ({totalQty})</h2>

      {totalQty === 0 ? (
        <div className="empty-cart">
          <img src="/images/illustration-empty-cart.svg" alt="empty icon" />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <>
                <li key={item.name} className="cart-item">
                  <div className="cart-item-detalis">
                    <p className="name">{item.name}</p>
                    <p className="prices-detalis">
                      <span className="item-qty">{item.qty}x</span>
                      <span className="item-price">
                        @${item.price.toFixed(2)}
                      </span>
                      <span className="price-qty">
                        ${(item.qty * item.price).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <FaRegTimesCircle
                      className="btn-remove"
                      onClick={() => onRemove(item)}
                    />
                  </div>
                </li>
                <hr />
              </>
            ))}
          </ul>

          <div className="cart-total">
            <p>
              <span>Order Total</span>
            </p>
            <span className="total-price">${total.toFixed(2)}</span>
          </div>

          <div className="confirm-order">
            <button
              className="btn-confirm"
              onClick={() => {
                setShowPopup(true);
                localStorage.setItem("lastOrder", JSON.stringify(cartItems));
              }}
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>
              <FaRegCheckCircle className="cricle-check" /> Order Confirmed!
            </h3>
            <ul className="popup-list">
              {cartItems.map((item) => (
                <li key={item.name} className="popup-item">
                  <img src={item.img} alt={item.name} className="popup-img" />
                  <div>
                    <p>{item.name}</p>
                    <p>
                      {item.qty} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="popup-total">
              Order Total <span>${total.toFixed(2)}</span>
            </p>
            <div className="confirm-order">
              <button
                className="btn-confirm"
                onClick={() => {
                  setShowPopup(false);
                  setCartItems([]);
                  localStorage.removeItem("lastOrder");
                  localStorage.removeItem("cartItems");
                }}
              >
                Start New Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
