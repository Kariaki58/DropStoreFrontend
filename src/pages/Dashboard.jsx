import React from 'react';
import images from '../assets';
import { MdDashboard } from "react-icons/md";
import { TbShoppingCartShare } from "react-icons/tb";
import { TbBuildingStore } from "react-icons/tb";
import { IoMdHelpCircle } from "react-icons/io";
import { FaRegAddressBook } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';


const Dashboard = () => {
   
    const handleImageClick = () => {
      document.getElementById('newImage').click()
    }
    
  return (
    <div className='flex'>
      <div className='bg-purple-900 h-screen w-[20%] flex items-center flex-col overflow-y-auto'>
        <div className='text-center mt-5'>
          <div className='w-28 h-28 mx-auto'>
            <img src={images.defaultImage} className='rounded-full cursor-pointer' onClick={handleImageClick}/>
            <input type='file' accept='image/*' id='newImage' className='hidden' onClick={handleImageClick} />
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
