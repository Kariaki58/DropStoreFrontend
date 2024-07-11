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
    const [formData, setFormData] = useState({
      fullName: '',
      phoneNumber: '',
      address: '',
      city: '',
      country_code: '',
      state: '',
      postalCode: 0,
      country: '',
    })
    const dispatch = useDispatch()
    const { userAccountInfo, loadingState, error } = useSelector(state => state.profile)

    useEffect(() => {
      dispatch(userProfile())
      setFormData(userAccountInfo)
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
    
  return (
    <div className='flex'>
      <div className='bg-light-gray h-screen w-[20%] flex items-center flex-col overflow-y-auto'>
        <div className='text-center mt-5'>
          <div className='w-28 h-28 mx-auto'>
            <img src={images.defaultImage || previewImg} className='w-full h-full object-cover rounded-full'/>
          </div>
          <input value={formData.fullName} type='text' className='mt-4 text-center bg-transparent focus:outline-none text-dark-gray text-2xl' readOnly/>
        </div>
        <div className='mt-10 self-start pl-5'>
          <ul className='space-y-7'>
            <Link to='/api/dashboard'>
              <li className='flex mb-7 items-center gap-2 text-2xl bg-dashboard-light-teal p-3 rounded-lg cursor-pointer hover:bg-dashboard-darker-teal text-dark-gray active:bg-dashboard-darker-teal'>
                <MdDashboard />
                <p>Dashboard</p>
              </li>
            </Link>
            <Link to='/api/dashboard/orders'>
              <li className='mb-7 flex items-center gap-2 text-2xl bg-dashboard-light-teal p-3 rounded-lg cursor-pointer hover:bg-dashboard-darker-teal text-dark-gray active:bg-dashboard-darker-teal'>
                <TbShoppingCartShare />
                <p>Orders</p>
              </li>
            </Link>
            <Link to='/api/customize/store'>
              <li className='mb-7 flex items-center gap-2 text-2xl bg-dashboard-light-teal p-3 rounded-lg cursor-pointer hover:bg-dashboard-darker-teal text-dark-gray active:bg-dashboard-darker-teal'>
                <TbBuildingStore />
                <p>Manage Store</p>
              </li>
            </Link>
            <Link>
              <li className='mb-7 flex items-center gap-2 text-2xl bg-dashboard-light-teal p-3 rounded-lg cursor-pointer hover:bg-dashboard-darker-teal text-dark-gray active:bg-dashboard-darker-teal'>
                <IoMdHelpCircle />
                <p>Help?</p>
              </li>
            </Link>
            <Link to='/api/profile'>
              <li className='flex items-center gap-2 text-2xl bg-dashboard-light-teal p-3 rounded-lg cursor-pointer hover:bg-dashboard-darker-teal text-dark-gray active:bg-dashboard-darker-teal'>
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
