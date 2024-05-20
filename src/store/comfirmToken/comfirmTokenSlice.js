import { createSlice } from "@reduxjs/toolkit";
import { comfirmToken } from "./comfirmTokenPost";


const initialState = {
    token: '',
    status: '',
    error: null
}

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(comfirmToken.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(comfirmToken.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        })
        .addCase(comfirmToken.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
    }
})

export default tokenSlice.reducer
