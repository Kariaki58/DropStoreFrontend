import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get orders function
export const getOrders = createAsyncThunk('orders/get', async (rejectWithValue) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/dashboard/orders`, { withCredentials: true });
        if (response.data.error) {
            return rejectWithValue(response.data.error)
        }
        return response.data;
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
            return rejectWithValue(err.response.data.error)
        }
        return rejectWithValue("An error occured")
    }
});
