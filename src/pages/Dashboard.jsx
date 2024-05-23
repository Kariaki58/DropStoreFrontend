import React from 'react';
import images from '../assets';
import { MdDashboard } from "react-icons/md";
import { TbShoppingCartShare } from "react-icons/tb";
import { TbBuildingStore } from "react-icons/tb";
import { IoMdHelpCircle } from "react-icons/io";
import { FaRegAddressBook } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Dashboard = () => {
  return (
    <div className='flex'>
      <div className='bg-purple-900 h-screen w-[20%] flex items-center flex-col overflow-y-auto'>
        <div className='text-center mt-5'>
          <div className='w-28 h-28 mx-auto'>
            <img src={images.defaultImage} className='rounded-full' />
          </div>
          <input value='Kariaki Stephen' type='text' className='mt-4 text-center bg-transparent focus:border focus:outline-none text-white'/>
        </div>
        <div className='mt-10 self-start pl-5'>
          <ul className='space-y-7'>
            <li className='flex items-center gap-2 text-2xl bg-slate-600 p-3 rounded-lg cursor-pointer hover:bg-slate-800 text-white active:bg-slate-800'>
              <MdDashboard /> 
              <p>Dashboard</p>
            </li>
            <li className='flex items-center gap-2 text-2xl bg-slate-600 p-3 rounded-lg cursor-pointer hover:bg-slate-800 text-white active:bg-slate-800'>
              <TbShoppingCartShare />
              <p>Orders</p>
            </li>
            <li className='flex items-center gap-2 text-2xl bg-slate-600 p-3 rounded-lg cursor-pointer hover:bg-slate-800 text-white active:bg-slate-800'>
              <TbBuildingStore />
              <Link to='/api/store'></Link>
              <p>Manage Store</p>
            </li>
            <li className='flex items-center gap-2 text-2xl bg-slate-600 p-3 rounded-lg cursor-pointer hover:bg-slate-800 text-white active:bg-slate-800'>
              <IoMdHelpCircle />
              <p>Help?</p>
            </li>
            <li className='flex items-center gap-2 text-2xl bg-slate-600 p-3 rounded-lg cursor-pointer hover:bg-slate-800 text-white active:bg-slate-800'>
              <FaRegAddressBook />
              <p>Address</p>
            </li>
          </ul>
        </div>
      </div>
      <section className='h-full w-[80%] mt-5 p-5'>
        <aside className=''>
          <menu className='grid grid-cols-3 gap-8'>
            <div className='bg-slate-600 p-5 text-white text-xl font-bold rounded-lg'>
              <p>530</p>
              <p>Orders</p>
            </div>
            <div className='bg-slate-600 p-5 text-white text-xl font-bold rounded-lg'>
              <p>200</p>
              <p>Orders fullfield</p>
            </div>
            <div className='bg-slate-600 p-5 text-white text-xl font-bold rounded-lg'>
              <p>$2,800</p>
              <p>Total Earning</p>
            </div>
          </menu>
          <menu className='grid grid-cols-3 mt-10 w-[100%] gap-10'>
            <div className='col-span-2 bg-slate-600 h-[380px]'>
              Chart
            </div>
            <div className=' bg-slate-600 h-[280px]'>
              Pie Chart
            </div>
          </menu>
        </aside>
        <div className="overflow-x-auto mt-10 mb-10" style={{ scrollbarWidth: 'thin' }}>
          <table className="min-w-full border border-gray-200 bg-slate-600 ">
            <thead>
              <tr className="w-fulltext-left text-white font-bold">
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Customer</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Delivery</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>Image here</p>
                  <p>Shoe</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>Ebilate Kariaki</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>Nigeria</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>2</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>Pending</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <select className="block w-full border bg-slate-600 p-2 focus:outline-none border-gray-300 rounded-md">
                    <option>Received</option>
                    <option>Delivering</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>Image here</p>
                  <p>Shoe</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>Ebilate Kariaki</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>Nigeria</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>2</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>Pending</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <select className="block w-full border bg-slate-600 p-2 focus:outline-none border-gray-300 rounded-md">
                    <option>Received</option>
                    <option>Delivering</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>Image here</p>
                  <p>Shoe</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>Ebilate Kariaki</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>Nigeria</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>2</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <p>Pending</p>
                </td>
                <td className="py-2 px-4 border-b bg-slate-600 text-white ">
                  <select className="block w-full border bg-slate-600 p-2 focus:outline-none border-gray-300 rounded-md">
                    <option>Received</option>
                    <option>Delivering</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
