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
    const [previewImg, setPreviewImg] = useState(null)
    const dispatch = useDispatch()

    const { userAccountInfo, loadingState, error } = useSelector(state => state.profile)

    useEffect(() => {
      dispatch(userProfile())
    }, [])

    useEffect(() => {
      setPreviewImg(userAccountInfo.profile)
    }, [loadingState])
  
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
            <img src={previewImg || images.defaultImage} className='w-full h-full object-cover rounded-full'/>
          </div>
          <input value='Kariaki Stephen' type='text' className='mt-4 text-center bg-transparent focus:outline-none text-white' readOnly/>
        </div>
        <div className='mt-10 self-start pl-5'>
          <ul className='space-y-7'>
            <Link to='/api/dashboard'>
              <li className='flex mb-7 items-center gap-2 text-2xl bg-slate-900 p-3 rounded-lg cursor-pointer hover:bg-slate-700 text-white active:bg-slate-700'>
                <MdDashboard />
                <p>Dashboard</p>
              </li>
            </Link>
            <Link to='/api/dashboard/orders'>
              <li className='mb-7 flex items-center gap-2 text-2xl bg-slate-900 p-3 rounded-lg cursor-pointer hover:bg-slate-700 text-white active:bg-slate-700'>
                <TbShoppingCartShare />
                <p>Orders</p>
              </li>
            </Link>
            <Link to='/api/customize/store'>
              <li className='mb-7 flex items-center gap-2 text-2xl bg-slate-900 p-3 rounded-lg cursor-pointer hover:bg-slate-700 text-white active:bg-slate-700'>
                <TbBuildingStore />
                <p>Manage Store</p>
              </li>
            </Link>
            <Link>
              <li className='mb-7 flex items-center gap-2 text-2xl bg-slate-900 p-3 rounded-lg cursor-pointer hover:bg-slate-700 text-white active:bg-slate-700'>
                <IoMdHelpCircle />
                <p>Help?</p>
              </li>
            </Link>
            <Link to='/api/profile'>
              <li className='flex items-center gap-2 text-2xl bg-slate-900 p-3 rounded-lg cursor-pointer hover:bg-slate-700 text-white active:bg-slate-700'>
                <FaRegAddressBook />
                <p>Address</p>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
