// create a new user store with login usr credentials
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const CreateStore = createAsyncThunk('customise/store', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/create/store`, data, { withCredentials: true })
        if (response.data.error) {
            return rejectWithValue(response.data.error)
        }
        return response.data.msg
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
            return rejectWithValue(err.response.data.error)
        }
        return rejectWithValue("An error occured")
    }
})
