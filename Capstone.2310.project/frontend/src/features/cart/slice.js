import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      // Add item to cart
      const newItem = action.payload;
      state.push(newItem);
    },
    removeFromCart: (state, action) => {
      // Remove item from cart
      const itemId = action.payload;
      state = state.filter(item => item.id !== itemId);
    },
    updateCart: (state, action) => {
      // Update item quantity in cart
      const { itemId, newQuantity } = action.payload;
      const itemToUpdate = state.find(item => item.id === itemId);
      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
      }
    },
    // ... other actions if needed
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;

