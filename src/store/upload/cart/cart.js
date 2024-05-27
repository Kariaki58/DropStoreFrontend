import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const Cart = createAsyncThunk('cart/get', async () => {
    const response = await axios.get('http://localhost:5000/api/cart', { withCredentials: true })
    return response.data.msg
})
