import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router';
import images from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../store/Profile/userProfile';

const Settings = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { userAccountInfo, loadingState, error } = useSelector(state => state.profile)

  useEffect(() => {
    dispatch(userProfile())
  }, [])

  useEffect(() => {
    setPreviewImg(userAccountInfo.profile)
  }, [loadingState])
  const uploadFile = async (type, timestamp, signature) => {
    const folder = import.meta.env.VITE_APP_IMAGE_FOLDER;
    const data = new FormData();

    data.append("file", type === 'image' ? image : video); // Fix variable reference here
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", import.meta.env.VITE_APP_CLOUDINARY_API_KEY); // Store in .env file
    data.append("folder", folder);

    try {
      const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME; // Store in .env file
      const resourceType = 'image';
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;

      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const getSignatureForUpload = async (folder) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/gensignature`, { folder }, { withCredentials: true });
      return res.data;
    } catch (error) {
      console.error(error);
      return
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { timestamp: imgTimestamp, signature: imgSignature } = await getSignatureForUpload('images');
      const imgUrl = await uploadFile('image', imgTimestamp, imgSignature);

      const response = await axios.patch(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/profile`, { imgUrl }, { withCredentials: true })

      console.log(response.data.msg)
      setPreviewImg(imgUrl)
      setImage(null);
      setPreviewImg(null);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImg(previewUrl);
    }
  };

  if (!loadingState) {
    return (
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    )
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Edit Your Profile</h1>
        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <div className="h-40 w-40 relative mx-auto">
              {loading && (
                <div className="flex justify-center mt-6 absolute inset-0 items-center">
                  <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  />
                </div>
              )}
              <img 
                src={previewImg || images.defaultImage}
                alt="Profile Preview" 
                className="w-full h-full rounded-full object-cover cursor-pointer" 
                onClick={() => document.getElementById('upload').click()} 
              />
            </div>
            <input
              type="file"
              name="upload"
              accept="image/*"
              id="upload"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-800"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
