// add store product to the array
import { createSlice } from '@reduxjs/toolkit';
import { StoreProductFetch } from './StoreProduct';
import { revertAll } from '../../actions';


const initialState = {
    data: [],
    loading: true,
    error: null
}

const storeSlice = createSlice({
    name: 'storeproduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => [
        builder.addCase(StoreProductFetch.pending, (state) => {
            state.loading = true
        })
        .addCase(StoreProductFetch.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        })
        .addCase(StoreProductFetch.rejected, (state, action) => {
            state.error = action.payload
            state.loading = true
        })
        .addCase(revertAll, () => initialState)
    ]
})

export default storeSlice.reducer