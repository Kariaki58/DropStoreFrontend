import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from "react-router";


export const StoreProductFetch = createAsyncThunk('storeProduct/fetch', async (storeId) => {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/${storeId}/products`, { withCredentials: true })

    return response.data
})