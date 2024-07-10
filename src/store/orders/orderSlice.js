// get order slice
import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "./orderGet";
import { revertAll } from "../actions";

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
                state.error = action.payload;
            })
            .addCase(revertAll, () => initialState);
    }
});

export default orderSlice.reducer;
