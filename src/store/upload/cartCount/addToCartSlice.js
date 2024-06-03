import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "./addTocart";


const initialState = {
    loading: true,
    count: 0,
    error: null
}

const addToCartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false
            state.count = action.payload
        })
        builder.addCase(addToCart.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload
        })
    }
})

export default addToCartSlice.reducer
