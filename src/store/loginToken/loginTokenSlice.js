import { createSlice } from "@reduxjs/toolkit";
import { logInAccount } from "./loginTokenPost";

const initialState = {
    email: '',
    password: '',
    loading: true,
    data: '',
    error: ''
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(logInAccount.pending, (state) => {
            state.status = true
        })
        .addCase(logInAccount.fulfilled, (state, action) => {
            state.status = false
            state.data = action.payload
        })
        .addCase(logInAccount.rejected, (state, action) => {
            state.status = true
            state.error = action.payload
        })
    }
})

export default loginSlice.reducer
