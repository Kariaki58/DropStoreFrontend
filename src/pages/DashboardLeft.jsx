import { LuLayoutDashboard } from "react-icons/lu";
import { FaRocketchat, FaUsers, FaStore } from 'react-icons/fa';
import { IoIosArrowDropdown } from "react-icons/io";
import { MdOutlineSettings, MdOutlineStore } from "react-icons/md";
import { IoMdHelpCircle } from "react-icons/io";
import { GiWorld } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';


export default function DashBoardLeft() {
    const [isDrop, setIsDrop] = useState(false);
    const location = useLocation();
    const isSettingsPage = location.pathname === '/api/settings';
    return (
        <div>
            <div className="flex mt-7 ml-4 gap-4">
            <LuLayoutDashboard  className="w-[30px] h-[30px]"/>
            <p className="text-2xl">Dashboard</p>
            </div>

            <div className="flex mt-5 ml-4 gap-4">
            <FaRocketchat className="w-[30px] h-[30px]"/>
            <p className="text-2xl">Chat</p>
            </div>

            <div className="flex mt-5 ml-4 gap-4">
            <FaUsers className="w-[30px] h-[30px]"/>
            <p className="text-xl">Users and Permissions</p>
            </div>

            <div className="flex mt-5 ml-4 gap-4 relative">
            <FaStore className="w-[30px] h-[30px]"/>
            <p className="text-xl">Ecommerce</p>
            <button  onClick={() => setIsDrop(!isDrop)}>
            <IoIosArrowDropdown className="w-[25px] h-[25px] mt-[3px]"/>
            </button>
            </div>
            {isDrop && (
                <div className="absolute left-[85px] mt-2 bg-black z-10 shadow-lg border border-gray-200 rounded-md w-40">
                    <p className="text-sm p-2 hover:bg-[#1D5189] cursor-pointer"> Products</p>
                    <p className="text-sm p-2 hover:bg-[#1D5189] cursor-pointer"> Orders</p>
                    <p className="text-sm p-2 hover:bg-[#1D5189] cursor-pointer">Customers</p>
                    <p className="text-sm p-2 hover:bg-[#1D5189] cursor-pointer">Content</p>
                </div>
            )}

            <div className={`flex mt-5 ml-4 gap-4 ${isSettingsPage ? 'underline' : ''}`}>
            <MdOutlineSettings className="w-[30px] h-[30px]"/>
            <p className="text-2xl">Settings</p>
            </div>

            <div className="flex mt-5 ml-4 gap-4">
            <MdOutlineStore className="w-[30px] h-[30px]"/>
            <p className="text-2xl">Customize store</p>
            </div>

            <div className="flex mt-5 ml-4 gap-4">
            <GiWorld className="w-[30px] h-[30px]"/>
            <p className="text-2xl">Live customers</p>
            </div>

            <div className="flex mt-5 ml-4 gap-4">
            <IoMdHelpCircle className="w-[30px] h-[30px]"/>
            <p className="text-2xl">Help</p>
            </div>

            <div className=" mt-[250px] flex ml-4 gap-4">
            <CiLogout className="w-[30px] h-[30px]"/>
            <p className="text-2xl">Logout</p>
            </div>
        </div>
    );
}