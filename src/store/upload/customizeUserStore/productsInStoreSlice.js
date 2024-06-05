// create user store slice
import { createSlice } from "@reduxjs/toolkit";
import { CreateStore } from "./productsInStorePost";


const initialState = {
    loading: true,
    myStore: [],
    error: null
}

const createStoreSlice = createSlice({
    name: 'createstore',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CreateStore.pending, (state) => {
            state.loading = true
        })
        builder.addCase(CreateStore.fulfilled, (state, action) => {
            state.loading = false
            state.myStore = action.payload
        })
        builder.addCase(CreateStore.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload
        })
    }
})

export default createStoreSlice.reducer
