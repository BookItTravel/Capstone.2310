import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers';

const rootReducer = {
  cart: cartReducer, // Wrap cartReducer inside an object
};

const store = configureStore({
  reducer: rootReducer, // Pass rootReducer to configureStore
});

export default store;

