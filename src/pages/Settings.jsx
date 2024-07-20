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
import SettingsForm from './SettingsForm';

const Settings = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 bg-[#1D5189] flex flex-col gap-3 text-white ">
       <DashBoardLeft/>
      </div>

      {/* will work on this later*/}
      <div className="w-4/5 bg-[#1f2937] flex">

       <div className="flex flex-col w-1/3 items-center text-white">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring ring-offset-2 mt-9">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className="object-cover rounded-full" />

            </div>
          </div>
          <button className="btn btn-active bg-blue-500 mt-4 px-16 py-[10px] rounded-2xl">Edit pic</button>
        </div>

        {/* Right larger section */}
  <div className="flex-1 p-8">
    <SettingsForm />
        </div>

      </div>
    </div>
  );
}

export default Settings;