import React, { useEffect, useState } from 'react';
import images from '../assets';
import '../index.css'
import { FaUsers } from "react-icons/fa";
import { TbBuildingStore } from "react-icons/tb";
import { IoMdHelpCircle } from "react-icons/io";
import { FaRegAddressBook } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { IoMdArrowDropup } from "react-icons/io";
import { BsBagCheckFill } from "react-icons/bs";
import { FiVideo } from "react-icons/fi";
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../store/Profile/userProfile';
import { ThreeDots } from 'react-loader-spinner';
import { FaMessage } from 'react-icons/fa6';
import { IoMdArrowDropdown } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { PiChartLineUpBold } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { PiUsersThreeBold } from "react-icons/pi";
import { FaRocketchat } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";



const Dashboard = () => {
  const [previewImg, setPreviewImg] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    country_code: '',
    state: '',
    postalCode: 0,
    country: '',
  });
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const dispatch = useDispatch();
  const { userAccountInfo, loadingState, error } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(userProfile());
    setFormData(userAccountInfo);
  }, []);

  useEffect(() => {
    setPreviewImg(userAccountInfo.profile);
  }, [loadingState]);

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
    );
  }

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className='flex'>
      <div className='bg-white w-[20%] overflow-x-hidden flex items-center flex-col h-full'>
        <div className='text-center mt-5'>
          <div className='w-28 h-28 mx-auto'>
            <img src={images.defaultImage || previewImg} className='w-full h-full object-cover rounded-full'/>
          </div>
          <input value={formData.fullName} type='text' className='mt-4 text-center bg-transparent focus:outline-none text-[#343A40] text-2xl' readOnly/>
        </div>
        <div className='mt-10 self-start pl-5'>
          <ul className='space-y-7'>
            <Link to='/api/dashboard'>
              <li className='flex mb-2 items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-teal'>
                <PiChartLineUpBold />
                <p>Analytics</p>
              </li>
            </Link>
            <Link to='/api/customize/store'>
              <li className='mb-2 flex items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-teal'>
                <TbBuildingStore />
                <p>customize Store</p>
              </li>
            </Link>
            <Link to='/api/customize/store'>
              <li className='mb-2 flex items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-teal'>
                <FiSettings />
                <p>settings</p>
              </li>
            </Link>
            <li className='flex items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-teal' onClick={toggleAccordion}>
              <BsBagCheckFill />
              <p>Ecommerce</p>
              {
                isAccordionOpen ? 
                <IoMdArrowDropup />:<IoMdArrowDropdown />
              }
            </li>
            {isAccordionOpen && (
              <div className="pl-5">
                <Link to='/api/customize/store'>
                  <li className='mb-2 flex items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-teal'>
                    <MdOutlineProductionQuantityLimits />
                    <p>products</p>
                  </li>
                </Link>
                <Link to='/api/customize/store'>
                  <li className='mb-2 flex items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-teal'>
                    <FiVideo />
                    <p>content</p>
                  </li>
                </Link>
                <Link to='/api/dashboard/orders'>
                  <li className='mb-2 flex items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-teal'>
                    <BsCartCheck />
                    <p>Orders</p>
                  </li>
                </Link>
                <Link to='/api/customize/store'>
                  <li className='mb-2 flex items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-teal'>
                    <PiUsersThreeBold />
                    <p>customers</p>
                  </li>
            </Link>
              </div>
            )}
            <Link to='/api/profile'>
              <li className='mt-7 mb-2 flex items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-teal'>
                <FaRegAddressBook />
                <p>Address</p>
              </li>
            </Link>
            <Link>
              <li className='mb-2 flex items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-dark-teal'>
                <FaRocketchat />
                <p>Chat</p>
              </li>
            </Link>
            <Link>
              <li className='mb-2 flex items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-dark-teal'>
                <FaUsers />
                <p>Permissions</p>
              </li>
            </Link>
            <Link>
              <li className='mb-28 flex items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-teal'>
                <IoMdHelpCircle />
                <p>Help?</p>
              </li>
            </Link>
            <Link>
              <li className='mb-2 flex items-center gap-2 text-2xl text-[#343A40] hover:bg-[#DADADA] p-2 rounded-lg cursor-pointer active:bg-dashboard-darker-dark-teal'>
                <GrLogout />
                <p>Logout</p>
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
