import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const logOutAccount = createAsyncThunk('logout/post', async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/logout`, {}, { withCredentials: true })
        
        if (response.data.error) {
            return response.data.error
        }
        return response.data.msg
    } catch (err) {
        return err.message
    }
})