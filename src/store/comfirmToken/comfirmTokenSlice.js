// create slice to comfirm token
import { createSlice } from "@reduxjs/toolkit";
import { comfirmToken } from "./comfirmTokenPost";


const initialState = {
    token: '',
    loading: true,
    error: null
}

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(comfirmToken.pending, (state) => {
            state.loading = true
        })
        .addCase(comfirmToken.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(comfirmToken.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload
        })
    }
})

export default tokenSlice.reducer
