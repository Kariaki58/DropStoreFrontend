// authenticate user on registeration
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const createUserAccount = createAsyncThunk('userAccount/post', async (userData, { rejectWithValue })  => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/sign-up`, userData, { withCredentials: true })
        if (response.data.error) {
            return rejectWithValue(response.data.error)
        }
        return response.data.msg
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
            return rejectWithValue(err.response.data.error)
        }
        return rejectWithValue("An error occured")    }
})
