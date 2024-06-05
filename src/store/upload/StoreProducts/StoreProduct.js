// get store product
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const StoreProductFetch = createAsyncThunk('storeProduct/fetch', async (storeId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/${storeId}/products`, { withCredentials: true })
        return response.data
    } catch (err) {
        return err.response.data.error
    }
})