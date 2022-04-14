import { configureStore } from '@reduxjs/toolkit';
import {cartReducer, localStorageMiddleware} from './cart';
import {useEffect} from "react";

const reducer = {
  cart: cartReducer,
};

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
