import { createSlice } from "@reduxjs/toolkit";
import { CreateStore } from "./productsInStorePost";


const initialState = {
    loading: false,
    myStore: [],
    error: null
}

const createStoreSlice = createSlice({
    name: 'createstore',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CreateStore.pending, (state) => {
            state.loading = false
        })
        builder.addCase(CreateStore.fulfilled, (state, action) => {
            state.loading = true
            state.myStore = action.payload
        })
        builder.addCase(CreateStore.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default createStoreSlice.reducer
