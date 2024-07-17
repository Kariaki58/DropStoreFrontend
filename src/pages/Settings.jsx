/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import images from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../store/Profile/userProfile';
import DashBoardLeft from './DashboardLeft';

const Settings = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 bg-[#1D5189] flex flex-col gap-3 text-white ">
       <DashBoardLeft/>
      </div>

      {/* will work on this later*/}
      <div className="w-4/5 bg-white flex justify-center items-center">
        <p className="text-black text-lg">Right Side</p>
      </div>
    </div>
  );
}

export default Settings;