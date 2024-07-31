import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import images from '../../../assets';
import { ThreeDots } from 'react-loader-spinner';
import '../../../index.css';
import { getOrders } from '../../../store/orders/orderGet';
import { AreaChart, Tooltip, XAxis, YAxis, Area, ResponsiveContainer } from 'recharts';
import { FaChartLine } from "react-icons/fa6";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";



const Stats = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getOrders());
    getBackendData();
  }, [dispatch]);

  const getBackendData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/chart/data`, { withCredentials: true });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { orders, error, loading } = useSelector((state) => state.order);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ThreeDots color="#4fa94d" height={80} width={80} radius={9} ariaLabel="three-dots-loading" />
      </div>
    );
  }

  return (
    <section className="w-full md:w-[80%] mt-5 p-5 relative">
      {error && (
        <div className="bg-red-700 w-96 border rounded-full left-52 absolute top-[-50px]">
          <p className="p-3 text-center text-white">{error}</p>
        </div>
      )}
      <aside>
        <menu className="mb-10 w-full">
          <div className="card h-[380px] col-span-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="minute" />
                <YAxis dataKey="totalQuantity" />
                <Tooltip />
                <Area type="monotone" dataKey="totalOrders" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="totalQuantity" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </menu>
        <menu className='mb-10 grid grid-cols-3 gap-5'>
          <div className='card col-start-1 col-span-2 h-[280px]'></div>
          <div className="card h-[280px]"></div>
        </menu>
        <menu className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className='p-5 text-xl font-bold rounded-lg card'>
            <div className='flex items-center gap-2'>
              <div className='text-[#343A40]'>
                <FaChartLine />
              </div>
              <p className='text-[#343A40]'>Total Revenue</p>
            </div>
            <p className='text-[#343A40]'>$20,000</p>
          </div>
          <div className="p-5 text-xl font-bold rounded-lg card">
            <div>
              <p className='text-[#343A40]'>New Customers</p>
              <p className='text-[#343A40]'>430</p>
            </div>
            <div className='flex items-center mt-10'>
              <p className='text-[#cf2929] text-3xl'>
                <MdOutlineKeyboardArrowDown />
              </p>
              <p className='text-[#cf2929] font-normal'>18%</p>
            </div>
          </div>
          <div className="p-5 text-xl font-bold rounded-lg card">
            <p className='text-[#343A40]'>Average order value</p>
            <p className='text-[#343A40]'>$1,000</p>
            <div className='flex items-center mt-10'>
              <p className='text-[#3aff20] text-3xl'>
                <MdKeyboardArrowUp />
              </p>
              <p className='text-[#3aff20] font-normal'>23%</p>
            </div>
          </div>
          <div className="p-5 text-xl font-bold rounded-lg card">
            <p className='text-[#343A40]'>Convertion Rate</p>
            <p className='text-[#403a34]'>35.18%</p>
            <div className='flex items-center mt-10'>
              <p className='text-[#3aff20]'>
                <MdKeyboardArrowUp />
              </p>
              <p className='text-[#3aff20] font-normal'>23%</p>
            </div>
          </div>
        </menu>
        <menu className="card w-full mt-10">
          <h1 className='text-center font-bold text-2xl p-5 text-[#343A40] underline'>Best Selling Product</h1>
          <table className="min-w-full rounded-lg">
            <thead>
              <tr className="w-full">
                <th className="py-3 px-4 text-center text-xl font-semibold text-[#343A40]">Product ID</th>
                <th className="py-3 px-4 text-center text-xl font-semibold text-[#343A40]">Product</th>
                <th className="py-3 px-4 text-center text-xl font-semibold text-[#343A40]">Total Sales</th>
              </tr>
            </thead>
            <tbody>
              <tr className="w-full border-b hover:bg-gray-100">
                <td className="py-3 px-4 text-center text-xl text-[#343A40]">89323sabe</td>
                <td className="py-3 px-4 text-center text-xl text-[#343A40] flex items-center justify-center gap-3">
                  <div className='w-20'>
                    <img src={images.laptop} className='w-full h-full rounded'/>
                  </div>
                  <p>Men Hoodie, with sneaker 4 of them</p>
                </td>
                <td className="py-3 px-4 text-center text-xl text-[#343A40]">300</td>
              </tr>
              <tr className="w-full border-b hover:bg-gray-100">
                <td className="py-3 px-4 text-center text-xl text-[#343A40]">89323sabe</td>
                <td className="py-3 px-4 text-center text-xl text-[#343A40] flex items-center justify-center gap-3">
                  <div className='w-20'>
                    <img src={images.laptop} className='w-full h-full rounded'/>
                  </div>
                  <p>Men Hoodie, with sneaker 4 of them</p>
                </td>
                <td className="py-3 px-4 text-center text-xl text-[#343A40]">18k</td>
              </tr>
            </tbody>
          </table>
        </menu>
      </aside>
    </section>
  );
};

export default Stats;
