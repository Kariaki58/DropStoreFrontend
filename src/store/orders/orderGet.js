import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk('orders/get', async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/dashboard/orders', { withCredentials: true });
        return response.data.msg;
    } catch (err) {
        throw new Error(err.message);
    }
});
