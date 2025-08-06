import { createSlice } from '@reduxjs/toolkit';
import React from 'react'

const BillingDetailsSlice = createSlice ({
 name: 'billingDetails',
 initialState: {
    items: [],
 },
    reducers: {
        addToBillingDetails: (state, action) => {
            const exists = state.items.find(items => items._id === action.payload._id);
            if (!exists) {
                state.items.push(action.payload);
            }
        }
    }
});

export const { addToBillingDetails } = BillingDetailsSlice.actions;
export default BillingDetailsSlice.reducer;
