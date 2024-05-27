import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from "react-router";


export const StoreProductFetch = createAsyncThunk('storeProduct/fetch', async (storeId) => {
    const response = await axios.get(`http://localhost:5000/api/${storeId}/products`, { withCredentials: true })
    console.log("***********")
    console.log(response.data)
    console.log("***********")

    return response.data
})