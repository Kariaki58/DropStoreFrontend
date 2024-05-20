import { createSlice } from "@reduxjs/toolkit";
import { createUserAccount } from "./userPost";

const initialState =  {
    email: '',
    password: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createUserAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
  

export default userSlice.reducer
