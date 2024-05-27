import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCart = createAsyncThunk('cart/add', async (request) => {
    const response = await axios.post('http://localhost:5000/api/cart', request, { withCredentials: true })
    return response.data.msg
})