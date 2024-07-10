// add to cart function
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCart = createAsyncThunk('cart/add', async (request, { rejectWithValue }) => {
    const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart`, request, { withCredentials: true })
    try {
        if (response.data.error) {
            return rejectWithValue(response.data.error)
        }
        return response.data.msg
    } catch(err) {
        if (err && err.response && err.response.data && err.response.data.error) {
            return rejectWithValue(err.response.data.error)
        }
        return rejectWithValue("An error occured")
    }
})