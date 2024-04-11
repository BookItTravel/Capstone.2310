import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Add item to cart
      const newItem = action.payload;
      state.cart.push(newItem);
    },
    removeFromCart: (state, action) => {
      // Remove item from cart
      const itemId = action.payload;
      return state.filter((item) => item.id !== itemId); // Return the new state after removing the item
    },
    updateCart: (state, action) => {
      // Update item quantity in cart
      const { itemId, newQuantity } = action.payload;
      const itemToUpdate = state.find((item) => item.id === itemId);
      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
