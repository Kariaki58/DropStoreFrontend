import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


// get user account information
export const userProfile = createAsyncThunk("user/account/info", async (rejectWithValue) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/user`, { withCredentials: true })
        if (response.data.error) {
            return rejectWithValue(response.data.error)
        }
        return response.data.msg
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.error) {
            return rejectWithValue(error.response.data.error)
        }
        return rejectWithValue("An error ocured");
    }
})
