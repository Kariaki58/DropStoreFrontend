import { createSlice } from "@reduxjs/toolkit";
import { getHomePageData } from './homeGet';

const initialState = {
    content: [],
    loading: false,
    error: null
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getHomePageData.pending, (state) => {
            state.status = false
        })
        .addCase(getHomePageData.fulfilled, (state, action) => {
            state.status = true
            state.content = action.payload
        })
        .addCase(getHomePageData.rejected, (state, action) => {
            state.status = false
            state.error = action.payload
        })
    }
})

export default homeSlice.reducer
