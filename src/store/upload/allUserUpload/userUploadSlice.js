import { createSlice } from "@reduxjs/toolkit";
import { getUserUploads } from "./userUploadGet";


const initialState = {
    content: [],
    loading: false,
    error: null
}

const userUploadSlice = createSlice({
    name: 'userupload',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUserUploads.pending, (state) => {
            state.loading = false
        })
        .addCase(getUserUploads.fulfilled, (state, action) => {
            state.loading = true
            state.content = action.payload
        })
        .addCase(getUserUploads.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default userUploadSlice.reducer
