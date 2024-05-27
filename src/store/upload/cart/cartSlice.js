import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "./cart";


const initialState = {
    loading: false,
    cart: [],
    error: null
}

const CartSlice = createSlice({
    name: 'myCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(Cart.pending, (state) => {
            state.loading = false
        })
        builder.addCase(Cart.fulfilled, (state, action) => {
            state.loading = true
            state.cart = action.payload
        })
        builder.addCase(Cart.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default CartSlice.reducer
