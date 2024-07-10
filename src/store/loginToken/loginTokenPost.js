import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logInAccount = createAsyncThunk('login/post', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/login`,
      userData,
      { withCredentials: true }
    );
    console.log(response)
    if (response.data.error) {
      return rejectWithValue(response.data.error);
    }
    return response.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      return rejectWithValue(err.response.data.error);
    }
    return rejectWithValue('An error occurred during login');
  }
});
