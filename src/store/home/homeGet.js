import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getHomePageData = createAsyncThunk('home/page', async () => {
    try {
        const response = await axios.get('http://localhost:5000')
        console.log(response)
        return response.data.msg        
    } catch (err) {
        throw new Error(err.message)
    }
});
