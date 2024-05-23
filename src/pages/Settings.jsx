import axios from 'axios';
import React, { useState } from 'react';
import { BallTriangle } from 'react-loader-spinner'
import { useNavigate } from 'react-router';

const Settings = () => {
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const uploadFile = async (type, timestamp, signature) => {
        const folder = 'images'
        const data = new FormData()

        data.append("file", type === 'image' ? img : video);
        data.append("timestamp", timestamp);
        data.append("signature", signature);
        data.append("api_key", '914517458145777'); //store in .env file
        data.append("folder", folder);
        
        try {
            const cloudName = 'duzsm4tfc' //store in .env file
            const resourceType = 'image'
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

            const res = await axios.post(api, data)
            const { secure_url } = res.data

            console.log(secure_url)
            return secure_url
        } catch (error) {
            console.log(error)
        }
    }

    const getSignatureForUpload = async (folder) => {
        try {
          const res = await axios.post(`http://localhost:5000/api/upload`, { folder });
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
      
            console.log("File upload success!");
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
        loading && <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
      }
    </div>
  );
}

export default Settings;
