import React, { useEffect, useState } from 'react';
import images from '../assets';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { CreateStore } from '../store/upload/customizeUserStore/productsInStorePost';
import axios from 'axios';

// customized store, not yet completed
const CustomizedStore = () => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null); // New state for image preview
  const [getStore, setGetStore] = useState({});
  const [form, setForm] = useState({
    storeName: '',
    storeCategory: 'Kid Dress',
    banner: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const handleFormChange = async (e) => {
    setGetStore(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await signedUpload();

    try {
      const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/store/update`, { getStore, imgUrl }, { withCredentials: true });
      setError(response.data.msg)
    } catch (err) {
      setError(err.response.data.error)
      return
    }
  };

  const getStoreContent = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/get/store`, { withCredentials: true });
      setGetStore(response.data.msg);
      setLoading(true);
    } catch (error) {
      setError(error.response.data.error)
      return
    }
  };

  useEffect(() => {
    getStoreContent();
  }, []);

  const uploadFile = async (file, timestamp, signature) => {
    const folder = 'images';
    const data = new FormData();
    data.append('file', file);
    data.append('timestamp', timestamp);
    data.append('signature', signature);
    data.append('api_key', import.meta.env.VITE_APP_CLOUDINARY_API_KEY);
    data.append('folder', folder);

    try {
      const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
      const resourceType = 'image';
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      setError('something went wrong with cloudinary')
      return
    }
  };

  const getSignatureForUpload = async (folder) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/gensignature`,
        { folder },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      setError(error.response.data.error)
      return
    }
  };

  const signedUpload = async () => {
    const { timestamp: imgTimestamp, signature: imgSignature } = await getSignatureForUpload('images');
    const imgUrl = await uploadFile(img, imgTimestamp, imgSignature);
    return imgUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imgUrl = await signedUpload();
      const response = await dispatch(
        CreateStore({ storeName: form.storeName, storeCategory: form.storeCategory, banner: imgUrl })
      ).unwrap();
      setError(response)
      setImg(null);
      setForm({
        storeName: '',
        storeCategory: 'Kid Dress',
      });
      getStoreContent();
    } catch (error) {
      setError(error.response.data.error)
      return
    }
  };

  const changeBanner = () => {
    document.getElementById('banner').click();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      const previewUrl = URL.createObjectURL(file);
      setImgPreview(previewUrl);
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      {loading && getStore ? (
        <>
          <div className='relative w-full h-[200px] sm:h-[300px] lg:h-[400px]'>
            {
              error &&
              <div className='bg-red-500 z-50 absolute bottom-0 w-full p-2 sm:p-4'>
                <h1 className='text-white text-center text-xl sm:text-2xl lg:text-5xl'>{error}</h1>
              </div>
            }
            <img
              src={imgPreview || getStore.banner}
              onClick={changeBanner}
              alt='Banner'
              className='absolute inset-0 w-full h-full object-cover cursor-pointer'
            />
          </div>
          <div className='flex justify-center'>
            <div className='flex flex-col items-center w-full max-w-lg'>
              <form onSubmit={handleUpdateSubmit} className="w-full">
                <input
                  className='text-center font-bold text-3xl sm:text-4xl lg:text-5xl text-purple-900 focus:outline-none w-full'
                  value={getStore.storeName}
                  onChange={handleFormChange}
                  name='storeName'
                  placeholder='Store Name'
                />
                <select
                  value={getStore.storeCategory}
                  onChange={handleFormChange}
                  name='storeCategory'
                  className='block w-full border bg-purple-900 text-white text-lg sm:text-xl lg:text-2xl font-bold p-3 sm:p-5 focus:outline-none border-gray-300 rounded-md mt-5 mb-5'
                >
                  <option value='Kid Dress' className='font-bold text-xl'>
                    Kid Dress
                  </option>
                  <option value='Kitchen Utils' className='font-bold text-xl'>
                    Kitchen Utils
                  </option>
                  <option value='School items' className='font-bold text-xl'>
                    School items
                  </option>
                </select>
                <input
                  type='file'
                  onChange={handleImageChange}
                  accept='image/*'
                  id='banner'
                  className='hidden'
                />
                <div className='text-center mt-5'>
                  <Link to='/api/customize/store/upload'>
                    <button className='bg-purple-900 p-3 sm:p-5 rounded-full text-white font-bold mb-2'>Upload New Product</button>
                  </Link>
                </div>
                <div className='text-center mt-5'>
                  <button type='submit' className='bg-purple-900 px-5 py-2 sm:py-3 rounded-full text-white font-bold mb-10'>
                    Go live
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='relative w-full h-[200px] sm:h-[300px] lg:h-[400px]'>
            <img
              src={imgPreview || images.defaultImage} // Use the preview URL if available
              alt='Banner'
              className='absolute inset-0 w-full h-full object-cover'
              onClick={changeBanner}
            />
          </div>
          <div className='flex justify-center'>
            <div className='flex flex-col items-center w-full max-w-lg'>
              <form onSubmit={handleSubmit} className="w-full">
                <input
                  onChange={handleChange}
                  className='text-center font-bold text-3xl sm:text-4xl lg:text-5xl text-purple-900 focus:outline-none w-full'
                  value={form.storeName}
                  name='storeName'
                  placeholder='Store Name'
                />
                <select
                  value={form.storeCategory}
                  name='storeCategory'
                  onChange={handleChange}
                  className='block w-full border bg-purple-900 text-white text-lg sm:text-xl lg:text-2xl font-bold p-3 sm:p-5 focus:outline-none border-gray-300 rounded-md mt-5 mb-5'
                >
                  <option value='Kid Dress' className='font-bold text-xl'>
                    Kid Dress
                  </option>
                  <option value='Kitchen Utils' className='font-bold text-xl'>
                    Kitchen Utils
                  </option>
                  <option value='School items' className='font-bold text-xl'>
                    School items
                  </option>
                </select>
                <input
                  type='file'
                  onChange={handleImageChange}
                  accept='image/*'
                  id='banner'
                  className='hidden'
                />
                <div className='text-center mt-5'>
                  <button type='submit' className='bg-purple-900 px-5 py-2 sm:py-3 rounded-full text-white font-bold mb-10'>
                    Go live
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      <Outlet />
    </section>
  );
};

export default CustomizedStore;
