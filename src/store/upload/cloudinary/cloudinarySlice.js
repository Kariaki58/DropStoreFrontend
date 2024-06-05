// upload files to cloudinary
// not in use yet
import { createSlice } from "@reduxjs/toolkit";
import { uploadFile } from "./cloudinaryUpload";


const initialState = {
    imgUrl: null,
    videoUrl: null,
    loading: false,
    error: null,
}

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(uploadFile.pending, (state) => {
          state.loading = true;
        })
        .addCase(uploadFile.fulfilled, (state, action) => {
          state.loading = false;
          if (action.meta.arg.type === 'image') {
            state.imgUrl = action.payload;
          } else {
            state.videoUrl = action.payload;
          }
        })
        .addCase(uploadFile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
});
export default uploadSlice.reducer
