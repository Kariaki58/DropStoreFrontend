import React, { useEffect, useState } from 'react';
import images from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { CreateStore } from '../store/upload/customizeUserStore/productsInStorePost';
import axios from 'axios';

const CustomizedStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [getStore, setGetStore] = useState(null)
  const [form, setForm] = useState({
    storeName: '',
    storeCategory: 'Kid Dress',
  });
  const [loading, setLoading] = useState(false)

  const getStoreContent = async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/get/store`, { withCredentials: true })
    console.log('here')
    setGetStore(response.data.msg)
    setLoading(true)
  }

  useEffect(() => {
    getStoreContent()
  }, [])

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
      console.error(error);
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
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { timestamp: imgTimestamp, signature: imgSignature } = await getSignatureForUpload('images');
      const imgUrl = await uploadFile(img, imgTimestamp, imgSignature);

      const storeResponse = await dispatch(
        CreateStore({ storeName: form.storeName, storeCategory: form.storeCategory, banner: imgUrl })
      ).unwrap();
      console.log(storeResponse)

      setImg(null);
      setForm({
        storeName: '',
        storeCategory: 'Kid Dress',
      });
      getStoreContent()
      // navigate('/api/store');
    } catch (error) {
      console.error(error);
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
  console.log(getStore)
  return (
    <section>
      {
        loading && getStore ? <> <div className='relative w-full h-[400px]'>
        <img
          src={getStore.banner}
          alt='Banner'
          className='absolute inset-0 w-full h-full object-cover'
        />
      </div>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center'>
          <form>
            <input
              className='text-center font-bold text-[4rem] text-purple-900 focus:outline-none'
              value={getStore.storeName}
              name='storeName'
              placeholder='Store Name'
              readOnly
            />
            <select
              value={getStore.storeCategory}
              name='storeCategory'
              className='block w-full border bg-purple-900 text-white text-xl font-bold p-5 focus:outline-none border-gray-300 rounded-md mt-5 mb-5'
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
              onChange={(e) => setImg(e.target.files[0])}
              accept='image/*'
              id='banner'
              className='hidden'
            />
            <div className='text-center mt-5'>
              <Link to='/api/customize/store/upload'>
                <button className='bg-purple-900 p-5 rounded-full text-white font-bold mb-2'>Upload New Product</button>
              </Link>
            </div>
              <div className='text-center'>
                <button type='submit' className='bg-purple-900 px-5 py-2 rounded-full text-white font-bold'>
                  Go live
                </button>
            </div>
          </form>
          
        </div>
      </div>
      </>
      : (
        <> <div className='relative w-full h-[400px]'>
        <img
          src={images.defaultImage}
          alt='Banner'
          className='absolute inset-0 w-full h-full object-cover'
          onClick={changeBanner}
        />
      </div>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center'>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              className='text-center font-bold text-[4rem] text-purple-900 focus:outline-none'
              value={form.storeName}
              name='storeName'
              placeholder='Store Name'
            />
            <select
              value={form.storeCategory}
              name='storeCategory'
              onChange={handleChange}
              className='block w-full border bg-purple-900 text-white text-xl font-bold p-5 focus:outline-none border-gray-300 rounded-md mt-5 mb-5'
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
              onClick={changeBanner}
              onChange={(e) => setImg(e.target.files[0])}
              accept='image/*'
              id='banner'
              className='hidden'
            />
            <div className='text-center mt-5'>
              <button type='submit' className='bg-purple-900 px-5 py-2 rounded-full text-white font-bold mb-10'>
                Go live
              </button>
            </div>
          </form>
        </div>
      </div>
      </>
      )
      }
      
      <Outlet />
    </section>
  );
};

export default CustomizedStore;