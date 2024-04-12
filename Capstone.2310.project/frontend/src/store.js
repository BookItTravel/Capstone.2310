import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/slice";

const store = configureStore({
  reducer: {
    cart: cartSlice, // Include the cartSlice reducer under the 'cart' key in the Redux store
  },
});

export default store;
