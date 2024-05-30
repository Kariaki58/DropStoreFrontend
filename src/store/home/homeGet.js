import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getHomePageData = createAsyncThunk('home/page', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}`, { withCredentials: true })
        return response.data.msg        
    } catch (err) {
        throw new Error(err.message)
    }
});
