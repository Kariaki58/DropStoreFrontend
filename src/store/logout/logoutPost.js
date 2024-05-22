import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const logOutAccount = createAsyncThunk('logout/post', async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true })
        
        if (response.data.error) {
            return response.data.error
        }
        return response.data.msg
    } catch (err) {
        return err.message
    }
})