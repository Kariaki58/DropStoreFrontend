// get user cart on login
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const Cart = createAsyncThunk('cart/get', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart`, { withCredentials: true });
        console.log("here")
        console.log(response)
        if (response.data.error) {
            console.log(response.data.error)
            return rejectWithValue(response.data.error)
        }
        return response.data;
    } catch (err) {
        if (err && err.response && err.response.data && err.response.data.error) {
            console.log(err.response.data.error)
            return rejectWithValue(err.response.data.error);
        }
        return rejectWithValue("An unknown error occurred.");
    }
});
