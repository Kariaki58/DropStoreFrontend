import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const Cart = createAsyncThunk('cart/get', async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart`, { withCredentials: true })
    return response.data
})
