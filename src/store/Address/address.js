import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// sends user address from the address form to the backend
const userAddress = createAsyncThunk('user/address', async(request) => {
    const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/user/addres`, request, { withCredentials: true })
    return response.data
})

export default userAddress