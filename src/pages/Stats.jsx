import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { getOrders } from '../store/orders/orderGet';
import { AreaChart, Tooltip, XAxis, YAxis, Area, ResponsiveContainer } from 'recharts';


// display statistics and graphs
const Stats = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getOrders());
    getBackendData();
  }, [dispatch]);

  const getBackendData = async () => {
    try {
      const response = await axios.get("https://dropstorebackend.onrender.com/api/chart/data", { withCredentials: true });
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
    <section className="h-full w-full md:w-[80%] mt-5 p-5 relative">
      {error && (
        <div className="bg-red-700 w-96 border rounded-full left-52 absolute top-[-50px]">
          <p className="p-3 text-center text-white">{error}</p>
        </div>
      )}
      <aside className="">
        <menu className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-5 text-white text-xl font-bold rounded-lg">
            {orders && orders.msg && <p>{orders.msg.length}</p>}
            <Link to="/api/dashboard/orders">
              <p>Orders</p>
            </Link>
          </div>
          <div className="bg-slate-900 p-5 text-white text-xl font-bold rounded-lg">
            <p>{orders.filledOrder}</p>
            <p>Orders fulfilled</p>
          </div>
          <div className="bg-slate-900 p-5 text-white text-xl font-bold rounded-lg">
            <p>$2,800</p>
            <p>Total Earnings</p>
          </div>
        </menu>
        <menu className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 w-full">
          <div className="bg-slate-900 h-[380px]">
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
          <div className="bg-slate-900 h-[280px]">Pie Chart</div>
        </menu>
      </aside>
    </section>
  );
};

export default Stats;
