// get user payload slice
import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "../actions";
import { createUserAccount } from "./userPost";

const initialState =  {
    email: '',
    password: '',
    loading: true,
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
        state.loading = true;
      })
      .addCase(createUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createUserAccount.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(revertAll, () => initialState);
  },
});


export default userSlice.reducer
