// upload a new product to the backend
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getSignatureForUpload = createAsyncThunk('upload/product', async (folder, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/sign-upload`, { folder });
        if (response.data.error) {
            return rejectWithValue(response.data.error)
        }
        return response.data
    } catch (error) {
        if (err.response && err.response.data && err.response.data.error) {
            return rejectWithValue(err.response.data.error)
        }
        return rejectWithValue("An error occured")
    }
})
