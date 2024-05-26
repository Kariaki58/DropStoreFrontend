import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCart = createAsyncThunk('cart/add', async (productId) => {
    const response = await axios.post('http://localhost:5000/api/cart', { productId }, { withCredentials: true })
    console.log(response.data.msg)
    return response.data.msg
})