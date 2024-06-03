import { createSlice } from "@reduxjs/toolkit";
import { createUserAccount } from "./userPost";

const initialState =  {
    email: '',
    password: '',
    loading: false,
    data: '',
    error: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAccount.pending, (state) => {
        state.loading = false;
      })
      .addCase(createUserAccount.fulfilled, (state, action) => {
        state.loading = true;
        state.data = action.payload;
      })
      .addCase(createUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default userSlice.reducer
