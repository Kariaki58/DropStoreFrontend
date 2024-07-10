import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// post comfirm token to the backend
export const comfirmToken = createAsyncThunk('comfirmToken/post', async (email_token, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/comfirm-token`, email_token, { withCredentials: true })
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
