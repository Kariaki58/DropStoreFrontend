// login token slice
import { createSlice } from "@reduxjs/toolkit";
import { logInAccount } from "./loginTokenPost";

const initialState = {
    email: '',
    password: '',
    token: '',
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
            state.loading = true
        })
        .addCase(logInAccount.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload.msg
            state.token = action.payload.token
        })
        .addCase(logInAccount.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload
        })
    }
})

export default loginSlice.reducer
