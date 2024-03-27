import axios from 'axios';
import {
  GET_CART_SUCCESS,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,
  UPDATE_CART_SUCCESS,
  CART_ERROR
} from './actionTypes';

export const getCart = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/cart/${userId}`);
    dispatch({
      type: GET_CART_SUCCESS,
      payload: res.data.cart
    });
  } catch (error) {
    dispatch({
      type: CART_ERROR,
      payload: { message: error.response.data.message }
    });
  }
};

export const addToCart = (userId, travelerId, quantity) => async (dispatch) => {
  try {
    const res = await axios.post('/cart', { user_id: userId, traveler_id: travelerId, quantity });
    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: res.data.cartItem
    });
  } catch (error) {
    dispatch({
      type: CART_ERROR,
      payload: { message: error.response.data.message }
    });
  }
};

export const removeFromCart = (userId, travelerId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/cart/${userId}/${travelerId}`);
    dispatch({
      type: REMOVE_FROM_CART_SUCCESS,
      payload: res.data.cartItem
    });
  } catch (error) {
    dispatch({
      type: CART_ERROR,
      payload: { message: error.response.data.message }
    });
  }
};

export const updateCart = (userId, travelerId, quantity) => async (dispatch) => {
  try {
    const res = await axios.patch(`/cart/${userId}/${travelerId}`, { quantity });
    dispatch({
      type: UPDATE_CART_SUCCESS,
      payload: res.data.cartItem
    });
  } catch (error) {
    dispatch({
      type: CART_ERROR,
      payload: { message: error.response.data.message }
    });
  }
};