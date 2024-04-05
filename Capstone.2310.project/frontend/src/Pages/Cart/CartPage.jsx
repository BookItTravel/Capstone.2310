import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCart } from "../../features/cart/slice.js"   // Import actions from cartSlice
import { Link } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cart); // Access cart state using useSelector hook
  const dispatch = useDispatch(); // Get dispatch function

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId)); // Dispatch removeFromCart action
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    dispatch(updateCart(itemId, newQuantity)); // Dispatch updateCart action
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div>{item.name}</div>
              <div>Quantity: {item.quantity}</div>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleUpdateQuantity(item.id, parseInt(e.target.value))
                }
                />
              </div>
            ))}
          </div>
        )}
        {cart.length === 0 ? (
          <Link to="/">
            <button>Home</button>
          </Link>
        ) : (
          <button>Proceed to Checkout</button>
        )}
      </div>
    );
  };

export default CartPage;