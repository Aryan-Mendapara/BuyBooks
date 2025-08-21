import { configureStore } from '@reduxjs/toolkit';
import wishlistSlice from '../Slice/wishlistSlice';
import authReducer from '../Slice/authSlice';
import BillingDetailsSlice from '../Slice/BillingDetailsSlice';

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
    billingdetails: BillingDetailsSlice, 
    auth: authReducer,
  }
});

export default store;
