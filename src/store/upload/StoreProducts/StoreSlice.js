import { createSlice } from '@reduxjs/toolkit';
import { StoreProductFetch } from './StoreProduct';


const initialState = {
    data: [],
    loading: '',
    error: null
}

const storeSlice = createSlice({
    name: 'storeproduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => [
        builder.addCase(StoreProductFetch.pending, (state) => {
            state.loading = false
        })
        .addCase(StoreProductFetch.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = true
        })
        .addCase(StoreProductFetch.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
    ]
})

export default storeSlice.reducer