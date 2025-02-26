import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import wishListSlice from './wishListSlice'
import addToCartSlice from './addToCartSlice'
import orderSlice from './orderSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        wishList: wishListSlice,
        addToCart: addToCartSlice,
        order: orderSlice
    }
});

export default store;