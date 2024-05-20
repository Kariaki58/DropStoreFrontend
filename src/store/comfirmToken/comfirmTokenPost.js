import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const comfirmToken = createAsyncThunk('comfirmToken/post', async (email_token) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/comfirm-token', email_token)
        if (response.data.error) {
            throw new Error(response.data.error)
        }
        return response.data.msg
        } catch (err) {
            console.log('error', err.message)
            return err.message
    }
})
