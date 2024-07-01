import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// post comfirm token to the backend
export const comfirmToken = createAsyncThunk('comfirmToken/post', async (email_token) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/comfirm-token`, email_token, { withCredentials: true })
        return response.data
        } catch (err) {
            return err.response.data.error
    }
})
