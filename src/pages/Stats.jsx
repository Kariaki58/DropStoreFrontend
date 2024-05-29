import React from 'react';
import { useEffect } from 'react';
import { getOrders } from '../store/orders/orderGet';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Stats = () => {
  const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getOrders())
    }, [dispatch])

    const { orders, error, loading } = useSelector((state) => state.order)

    const handleImageClick = () => {
      document.getElementById('newImage').click()
    }

  return (
      <section className='h-full w-[80%] mt-5 p-5'>
        <aside className=''>
          <menu className='grid grid-cols-3 gap-8'>
            <div className='bg-slate-900 p-5 text-white text-xl font-bold rounded-lg'>
              <p>{orders.length}</p>
              <Link to='/api/dashboard/orders'><p>Orders</p></Link>
            </div>
            <div className='bg-slate-900 p-5 text-white text-xl font-bold rounded-lg'>
              <p>200</p>
              <p>Orders fullfield</p>
            </div>
            <div className='bg-slate-900 p-5 text-white text-xl font-bold rounded-lg'>
              <p>$2,800</p>
              <p>Total Earning</p>
            </div>
          </menu>
          <menu className='grid grid-cols-3 mt-10 w-[100%] gap-10'>
            <div className='col-span-2 bg-slate-900 h-[380px]'>
              Chart
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
