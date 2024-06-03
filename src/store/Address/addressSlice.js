import { createSlice } from "@reduxjs/toolkit";
import userAddress from "./address";

const initialState = {
    address: [],
    loading: true,
    error: null
}

const addSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userAddress.pending, (state) => {
            state.loading = true
        })
        .addCase(userAddress.fulfilled, (state, action) => {
            state.loading = false
            state.address = action.payload
        })
        .addCase(userAddress.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload
        })
    }
})


export default addSlice.reducer
