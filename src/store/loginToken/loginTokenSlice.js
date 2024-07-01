import { createSlice } from "@reduxjs/toolkit";
import { logInAccount } from "./loginTokenPost";
import { resetLogin } from "../actions";


const initialState = {
  loading: true,
  data: '',
  error: '',
  token: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(logInAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.msg;
        state.token = action.payload.token;
      })
      .addCase(logInAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetLogin, () => initialState);
  }
});

export default loginSlice.reducer;