import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const userAddress = createAsyncThunk('user/address', async(request) => {
    const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/user/addres`, request, { withCredentials: true })
    console.log(response)
    console.log('here')
    return response.data
})

export default userAddress