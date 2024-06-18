import React, { useEffect, useState } from 'react';
import images from '../assets';
import { MdDashboard } from "react-icons/md";
import { TbShoppingCartShare } from "react-icons/tb";
import { TbBuildingStore } from "react-icons/tb";
import { IoMdHelpCircle } from "react-icons/io";
import { FaRegAddressBook } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../store/Profile/userProfile';
import { ThreeDots } from 'react-loader-spinner';


// dashboard design
const Dashboard = () => {
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [previewImg, setPreviewImg] = useState(null)
    const dispatch = useDispatch()

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
    
    const handleImageClick = (e) => {
      console.log("clicked")
      document.getElementById('newImage').click()
    }
    
  return (
    <div className='flex'>
      <div className='bg-purple-900 h-screen w-[20%] flex items-center flex-col overflow-y-auto'>
        <div className='text-center mt-5'>
          <div className='w-28 h-28 mx-auto'>
            <img src={previewImg || images.defaultImage} className='w-full h-full object-cover cursor-pointer rounded-full' onClick={handleImageClick}/>
            <input type='file' accept='image/*' id='newImage' className='hidden' onClick={handleImageClick} onChange={handleImageChange}/>
          </div>
          <input value='Kariaki Stephen' type='text' className='mt-4 text-center bg-transparent focus:border focus:outline-none text-white'/>
        </div>
        <div className='mt-10 self-start pl-5'>
          <ul className='space-y-7'>
            <li className='flex items-center gap-2 text-2xl bg-slate-900 p-3 rounded-lg cursor-pointer hover:bg-slate-700 text-white active:bg-slate-700'>
              <MdDashboard /> 
              <Link to='/api/dashboard'><p>Dashboard</p></Link>
            </li>
            <li className='flex items-center gap-2 text-2xl bg-slate-900 p-3 rounded-lg cursor-pointer hover:bg-slate-700 text-white active:bg-slate-700'>
              <TbShoppingCartShare />
              <Link to='/api/dashboard/orders'><p>Orders</p></Link>
            </li>
            <li className='flex items-center gap-2 text-2xl bg-slate-900 p-3 rounded-lg cursor-pointer hover:bg-slate-700 text-white active:bg-slate-700'>
              <TbBuildingStore />
              <Link to='/api/customize/store'><p>Manage Store</p></Link>
            </li>
            <li className='flex items-center gap-2 text-2xl bg-slate-900 p-3 rounded-lg cursor-pointer hover:bg-slate-700 text-white active:bg-slate-700'>
              <IoMdHelpCircle />
              <p>Help?</p>
            </li>
            <li className='text-2xl bg-slate-900 p-3 rounded-lg cursor-pointer hover:bg-slate-700 text-white active:bg-slate-800'>
              <Link to='/api/profile' className='flex gap-2 items-center'>
                <FaRegAddressBook />
                <p>Address</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
