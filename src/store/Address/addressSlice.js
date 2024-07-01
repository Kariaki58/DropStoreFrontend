// create slice to get payload
import { createSlice } from "@reduxjs/toolkit";
import userAddress from "./address";
import { revertAll } from "../actions";

const initialState = {
    address: [],
    loading: true,
    error: null
}

const addSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userAddress.pending, (state) => {
            state.loading = true
        })
        .addCase(userAddress.fulfilled, (state, action) => {
            state.loading = false
            state.address = action.payload
        })
        .addCase(userAddress.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload
        })
        .addCase(revertAll, () => initialState);
    }
})


export default addSlice.reducer
