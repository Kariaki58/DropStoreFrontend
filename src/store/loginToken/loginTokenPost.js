import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logInAccount = createAsyncThunk('login/post', async (userData, { rejectWithValue }) => {
  try {
    // Make the POST request to the login endpoint
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/login`,
      userData,
      { withCredentials: true }
    );

    // If the response contains an error, reject the promise with the error message
    if (response.data.error) {
      return rejectWithValue(response.data.error);
    }

    // Return the response data if the login is successful
    return response.data;
  } catch (err) {
    // If the request fails, reject the promise with the error message from the response
    if (err.response && err.response.data && err.response.data.error) {
      return rejectWithValue(err.response.data.error);
    }
    // If there is no specific error message, reject with a generic error message
    return rejectWithValue('An error occurred during login');
  }
});
