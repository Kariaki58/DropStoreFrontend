import React from 'react';
import { useEffect } from 'react';
import { getOrders } from '../store/orders/orderGet';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { AreaChart, Tooltip, XAxis, YAxis, Area, CartesianGrid, ResponsiveContainer } from 'recharts';


const Stats = () => {
  const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getOrders())
    }, [dispatch])

    const { orders, error, loading } = useSelector((state) => state.order)

    if (loading) {
      return (
        <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
      )
    }
    const data = [
      {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
      },
      {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
      },
      {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
      },
      {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
      },
      {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
      },
      {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
      },
      {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
      }
    ]

  return (
      <section className='h-full w-[80%] mt-5 p-5 relative'>
        {
          error && <div className='bg-red-700 w-96 border rounded-full left-52 absolute top-[-50px]'>
            <p className='p-3 text-center text-white'>{ error }</p>
          </div>
        }
        <aside className=''>
          <menu className='grid grid-cols-3 gap-8'>
            <div className='bg-slate-900 p-5 text-white text-xl font-bold rounded-lg'>
              {
               orders && orders.msg && <p>{orders.msg.length}</p>
              }
              <Link to='/api/dashboard/orders'><p>Orders</p></Link>
            </div>
            <div className='bg-slate-900 p-5 text-white text-xl font-bold rounded-lg'>
              <p>{orders.filledOrder}</p>
              <p>Orders fullfield</p>
            </div>
            <div className='bg-slate-900 p-5 text-white text-xl font-bold rounded-lg'>
              <p>$2,800</p>
              <p>Total Earning</p>
            </div>
          </menu>
          <menu className='grid grid-cols-3 mt-10 w-[100%] gap-10'>
            <div className='col-span-2 bg-slate-900 h-[380px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis dataKey="pv"/>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
            </div>
            <div className=' bg-slate-900 h-[280px]'>
              Pie Chart
            </div>
          </menu>
        </aside>
      </section>
  );
}

export default Stats;
