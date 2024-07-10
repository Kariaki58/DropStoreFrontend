import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// sends user address from the address form to the backend
const userAddress = createAsyncThunk('user/address', async(request, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/user/addres`, request, { withCredentials: true })
        if (response.data.error) {
            return rejectWithValue(response.data.error)
        }
        return response.data
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
            return rejectWithValue(err.response.data.error)
        }
        return rejectWithValue("An error occured")
    }
})

export default userAddress
