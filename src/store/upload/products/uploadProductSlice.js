// upload a new product slice
import { createSlice } from "@reduxjs/toolkit";
import { getSignatureForUpload } from "./uploadProduct";
import { revertAll } from "../../actions";


const initialState = {
    timestamp: null,
    signature: null,
    loading: true,
    error: null,
}

const signatureSlice = createSlice({
    name: 'signature',
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(getSignatureForUpload.pending, (state) => {
          state.loading = true;
        })
        .addCase(getSignatureForUpload.fulfilled, (state, action) => {
          state.loading = false;
          state.timestamp = action.payload.timestamp;
          state.signature = action.payload.signature;
        })
        .addCase(getSignatureForUpload.rejected, (state, action) => {
          state.loading = true;
          state.error = action.error.message;
        })
        .addCase(revertAll, () => initialState);
    },
});

export default signatureSlice.reducer
