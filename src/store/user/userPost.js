import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const createUserAccount = createAsyncThunk('userAccount/post', async (userData)  => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/sign-up', userData)
        if (response.data.error) {
            throw new Error(response.data.error)
        }
        return response.data.msg
    } catch (err) {
        console.log(err.message)
        return err.message
    }
})
