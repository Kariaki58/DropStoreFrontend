import { createSlice } from "@reduxjs/toolkit";
import userAddress from "./address";

const initialState = {
    address: [],
    loading: false,
    error: null
}

const addSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userAddress.pending, (state) => {
            state.loading = false
        })
        .addCase(userAddress.fulfilled, (state, action) => {
            state.loading = true
            state.address = action.payload
        })
        .addCase(userAddress.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default addSlice.reducer
