import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logInAccount = createAsyncThunk('login/post', async (userData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', userData, { withCredentials: true })
        if (response.data.error) {
            return response.data.error
        }
        return response.data.msg
    } catch (err) {
        return 'invalid credential'
    }
})
