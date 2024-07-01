// get user slice payload to the content list
import { createSlice } from "@reduxjs/toolkit";
import { getUserUploads } from "./userUploadGet";
import { revertAll } from "../../actions";


const initialState = {
    content: [],
    loading: true,
    error: null
}

const userUploadSlice = createSlice({
    name: 'userupload',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUserUploads.pending, (state) => {
            state.loading = true
        })
        .addCase(getUserUploads.fulfilled, (state, action) => {
            state.loading = false
            state.content = action.payload
        })
        .addCase(getUserUploads.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload
        })
        .addCase(revertAll, () => initialState);
    }
})

export default userUploadSlice.reducer
