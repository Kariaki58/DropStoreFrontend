import { createSlice } from "@reduxjs/toolkit";
import { getHomePageData } from './homeGet';

// change state to initail state
const initialState = {
    content: [],
    status: '',
    error: null
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getHomePageData.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getHomePageData.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.content = action.payload
        })
        .addCase(getHomePageData.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
    }
})

export default homeSlice.reducer
