import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const createUserAccount = createAsyncThunk('userAccount/post', async (userData)  => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/sign-up`, userData, { withCredentials: true })
        return response.data.msg
    } catch (err) {
        return err.response.data.error
    }
})
