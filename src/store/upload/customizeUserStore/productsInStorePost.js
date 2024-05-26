import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const CreateStore = createAsyncThunk('customise/store', async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/create/store`, data, { withCredentials: true })
    return response.data.msg
})