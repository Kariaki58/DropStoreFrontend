// get user cart on login
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const Cart = createAsyncThunk('cart/get', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart`, { withCredentials: true });
        return response.data;
    } catch (err) {
        console.error("Error fetching cart data:", err);
        if (err.response && err.response.data) {
            return rejectWithValue(err.response.data.error);
        }
        return rejectWithValue("An unknown error occurred.");
    }
});
