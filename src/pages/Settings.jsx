import axios from 'axios';
import React, { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router';

const Settings = () => {
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const uploadFile = async (type, timestamp, signature) => {
        const folder = import.meta.env.VITE_APP_IMAGE_FOLDER
        const data = new FormData()

        data.append("file", type === 'image' ? img : video);
        data.append("timestamp", timestamp);
        data.append("signature", signature);
        data.append("api_key", import.meta.env.VITE_APP_CLOUDINARY_API_KEY); //store in .env file
        data.append("folder", folder);
        
        try {
            const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME //store in .env file
            const resourceType = 'image'
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

            const res = await axios.post(api, data)
            const { secure_url } = res.data

            return secure_url
        } catch (error) {
        }
    }

    const getSignatureForUpload = async (folder) => {
        try {
          const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/upload`, { folder });
          return res.data;
        } catch (error) {
          console.error(error);
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const { timestamp: imgTimestamp, signature: imgSignature } = await getSignatureForUpload('images');
            const imgUrl = await uploadFile('image', imgTimestamp, imgSignature);
            // await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/videos`, { imgUrl, videoUrl });
      
            setImage(null);
      
            setLoading(false);
            navigate("/")
          } catch (error) {
            console.error(error);
          }
    }
  return (
    <div className='text-black'>
        <h1>Edit your profile</h1>
      <form onSubmit={handleUpload}>
        <label htmlFor='upload'>Upload profile</label>
        <input type='file' name='upload' accept='image/*' id='upload' onChange={(e) => setImage(() => e.target.files[0])}/><br />
        <button type="submit" className='bg-purple-700 p-5'>Upload</button>
      </form>
      {
        loading && <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
      }
    </div>
  );
}

export default Settings;
