// get user uploads

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getUserUploads = createAsyncThunk('upload/user', async (rejectWithValue) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/upload/product`, { withCredentials: true })
        if (response.data.error) {
            return rejectWithValue(response.data.error)
        }
        return response.data.msg
    } catch (err) {
        if (err && err.response && err.response.data && err.response.data.error) {
            return rejecctWithValue(err.response.data.error)
        }
        return rejectWithValue("An error occured")
    }
})
