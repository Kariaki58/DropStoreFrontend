import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk('orders/get', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/dashboard/orders`, { withCredentials: true });
        return response.data;
    } catch (err) {
        throw new Error(err.message);
    }
});
