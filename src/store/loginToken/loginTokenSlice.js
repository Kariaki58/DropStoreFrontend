import { createSlice } from "@reduxjs/toolkit";
import { logInAccount } from "./loginTokenPost";

const initialState = {
    email: '',
    password: '',
    status: '',
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
            state.status = 'loading'
        })
        .addCase(logInAccount.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        })
        .addCase(logInAccount.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
    }
})

export default loginSlice.reducer
