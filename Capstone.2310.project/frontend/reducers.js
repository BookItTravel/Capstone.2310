const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        error: null
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cart: [...state.cart, action.payload],
        error: null
      };
    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
        error: null
      };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
        error: null
      };
    case CART_ERROR:
      return {
        ...state,
        error: action.payload.message
      };
    default:
      return state;
  }
};

export default cartReducer;
