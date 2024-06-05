// add to cart function
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCart = createAsyncThunk('cart/add', async (request) => {
    const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart`, request, { withCredentials: true })
    return response.data.msg
})