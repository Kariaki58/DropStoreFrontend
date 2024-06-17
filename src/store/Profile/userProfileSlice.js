import { createSlice } from "@reduxjs/toolkit";
import { userProfile } from "./userProfile";


const initialState = {
    userAccountInfo: {},
    loadingState: false,
    error: null
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(userProfile.pending, (state) => {
            state.loadingState = false
        })
        .addCase(userProfile.fulfilled, (state, action) => {
            state.loadingState = true
            state.userAccountInfo = action.payload
        })
        .addCase(userProfile.rejected, (state, action) => {
            state.loadingState = false
            state.error = action.payload
        })
    }
})


export default profileSlice.reducer