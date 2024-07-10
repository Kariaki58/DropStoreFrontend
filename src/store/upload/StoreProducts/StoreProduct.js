// get store product
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const StoreProductFetch = createAsyncThunk('storeProduct/fetch', async (storeId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/${storeId}/products`, { withCredentials: true })
        if (response.data.error) {
            return rejectWithValue(response.data.error)
        }
        return response.data
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
            return rejectWithValue(err.response.data.error)
        }
        return rejectWithValue("An error occured")
    }
})