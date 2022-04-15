import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: typeof window !== 'undefined' && JSON.parse(localStorage.getItem('gskCart')) || [],
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.findIndex((item) => item.id === action.payload);
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
    removeAllFromCart: (state, action) => {
      state.length = 0;
    },
  },
});

//MIDDLEWARE
export const localStorageMiddleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    if(getState().cart.length > 0) {
      localStorage.setItem('gskCart', JSON.stringify(getState().cart));
    } else {
      localStorage.removeItem('gskCart');
    }
    return result;
  };
};

export const cartReducer = cart.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  removeAllFromCart,
} = cart.actions;
