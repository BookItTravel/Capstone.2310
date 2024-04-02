import React from "react";
import { connect } from "react-redux";
import { removeFromCart, updateCart } from "../../actions";
import "./CartPage.css";

const CartPage = ({ cart, removeFromCart, updateCart }) => {
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    updateCart(itemId, newQuantity);
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
      <button>Proceed to Checkout</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

const mapDispatchToProps = {
  removeFromCart,
  updateCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
