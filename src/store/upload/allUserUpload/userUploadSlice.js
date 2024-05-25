import { createSlice } from "@reduxjs/toolkit";
import { getUserUploads } from "./userUploadGet";


const initialState = {
    content: [],
    status: false,
    error: null
}

const userUploadSlice = createSlice({
    name: 'userupload',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUserUploads.pending, (state) => {
            state.status = false
        })
        .addCase(getUserUploads.fulfilled, (state, action) => {
            state.status = true
            console.log(action.payload)
            state.content = action.payload
        })
        .addCase(getUserUploads.rejected, (state, action) => {
            state.status = false
            state.error = action.payload
        })
    }
})

export default userUploadSlice.reducer
