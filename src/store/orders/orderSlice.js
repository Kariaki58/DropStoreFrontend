// get order slice
import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "./orderGet";

const initialState = {
    orders: [],
    error: null,
    loading: true,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = true;
                state.error = action.error.message;
            });
    }
});

export default orderSlice.reducer;
