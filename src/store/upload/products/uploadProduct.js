import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getSignatureForUpload = createAsyncThunk('upload/product', async (folder) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/sign-upload`, { folder });
        return res.data;
    } catch (error) {
        console.error(error);
    }
})
