import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


// get user account information
export const userProfile = createAsyncThunk("user/account/info", async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/user`, { withCredentials: true })
        console.log(response.data.msg)
        return response.data.msg
    } catch (error) {
        return error.response.data.error
    }
})
