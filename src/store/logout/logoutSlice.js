import { createSlice } from "@reduxjs/toolkit";
import { logOutAccount } from "./logoutPost";

const initialState = {
    data: '',
    status: '',
    error: ''
}
const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(logOutAccount.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(logOutAccount.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        })
        .addCase(logOutAccount.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
    }
})


export default logoutSlice.reducer
