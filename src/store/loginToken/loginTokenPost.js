// post login account credentials
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logInAccount = createAsyncThunk('login/post', async (userData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/login`, userData, { withCredentials: true })
        if (response.data.error) {
            return response.data.error
        }
        return response.data
    } catch (err) {
        return 'invalid credential'
    }
})
