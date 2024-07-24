// home page data set
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getHomePageData = createAsyncThunk('home/page', async (rejectWithValue) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}`, { withCredentials: true })
        if (response.data.error) {
            return rejectWithValue(response.data.error)
        }
        return response.data.msg
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
            return rejectWithValue(err.response.data.error)
        }
        return rejectWithValue("An error occured")
    }
});
