// user cart slice
import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "./cart";
import { revertAll } from "../../actions";


const initialState = {
    loading: true,
    cart: [],
    error: null
}

const CartSlice = createSlice({
    name: 'myCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(Cart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(Cart.fulfilled, (state, action) => {
            state.loading = false
            state.cart = action.payload
        })
        builder.addCase(Cart.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload
        })
        .addCase(revertAll, () => {});
    }
})

export default CartSlice.reducer
