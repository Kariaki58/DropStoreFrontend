import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import images from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../store/Profile/userProfile';


const Settings = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    phoneNumber: '',
    address: '',
    city: '',
    country_code: '',
    state: '',
    postalCode: 0,
    country: '',
  });
  const dispatch = useDispatch()

  const { userAccountInfo, loadingState, error } = useSelector(state => state.profile)

  useEffect(() => {
    dispatch(userProfile())
  }, [])

  useEffect(() => {
    setPreviewImg(userAccountInfo.profile)
    setFormData(userAccountInfo)
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
      const newDict = {...formData, imgUrl}


      const response = await axios.patch(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/profile`, { newDict }, { withCredentials: true })

      console.log(response.data.msg.profile)
      setPreviewImg(response.data.msg.profile)
      setFormData(response.data.msg)
      setImage(null);
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

  const handleTextChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handlePhoneChange = (value, country) => {
    setFormData(prev => ({
      ...prev,
      country_code: `+${country.dialCode}`,
      phoneNumber: value.replace(`+${country.dialCode}`, '')
    }));
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
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mt-5">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Edit Your Profile</h1>
        <form>
          <div className='flex justify-between sm:flex-row flex-col'>
            <div className='flex-1'>
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
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mt-7">userName</label>
                    <input value={formData.userName} name='userName' onChange={handleTextChange} className="block px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
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
            </div>
            <div className='flex-1'>
            <div className="max-w-lg mx-auto bg-white rounded-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Your Address</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <PhoneInput
                      country={'us'}
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                    />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea id="address" value={formData.address} onChange={handleTextChange} name="address" rows="3" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input id="city" value={formData.city} onChange={handleTextChange} name="city" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">State/Province</label>
                  <input id="state" value={formData.state} onChange={handleTextChange} name="state" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input id="postalCode" value={formData.postalCode} onChange={handleTextChange} name="postalCode" type="number" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                  <input id="country" value={formData.country} onChange={handleTextChange} name="country" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
              </form>
            </div>
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-center mt-5 w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 focus:outline-none focus:bg-purple-800"
            onClick={handleUpload}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
