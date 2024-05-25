import { createAsyncThunk } from "@reduxjs/toolkit";


export const uploadFile = createAsyncThunk('upload/uploadFile', async ({ type, file, timestamp, signature }) => {
    const folder = type === 'image' ? 'images' : 'videos';
    const data = new FormData();
    data.append("file", file);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    data.append("folder", folder);

    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const resourceType = type === 'image' ? 'image' : 'video';
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const res = await axios.post(api, data);
    return res.data.secure_url;
  }
);
