import { createSlice } from "@reduxjs/toolkit";
import { logOutAccount } from "./logoutPost";

const initialState = {
    data: '',
    loading: true,
    error: ''
}
const logoutSlice = createSlice({
    name: 'logout',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(logOutAccount.pending, (state) => {
            state.loading = false
        })
        .addCase(logOutAccount.fulfilled, (state, action) => {
            state.loading = true
            state.data = action.payload
        })
        .addCase(logOutAccount.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default logoutSlice.reducer
