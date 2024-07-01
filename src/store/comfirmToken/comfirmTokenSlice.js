// create slice to comfirm token
import { createSlice } from "@reduxjs/toolkit";
import { comfirmToken } from "./comfirmTokenPost";
import { revertAll } from "../actions";


const initialState = {
    jwttoken: '',
    loading: true,
    data: '',
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
            state.data = action.payload.msg
            state.jwttoken = action.payload.token
        })
        .addCase(comfirmToken.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload
        })
        .addCase(revertAll, () => initialState);
    }
})

export default tokenSlice.reducer
