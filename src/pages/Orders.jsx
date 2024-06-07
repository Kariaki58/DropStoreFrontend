import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../store/orders/orderGet';


// orders page to see orders from other 
const Orders = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState([]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (orders?.msg) {
      setState(prev => [...orders.msg]);
    }
  }, [orders]);

  const handleDeliveryChange = async (orderId, e) => {
    const updateStatus = e.target.value;
    const request = { orderId, value: updateStatus };

    setState(prev =>
      prev.map(order =>
        order._id === orderId ? { ...order, delivery: updateStatus } : order
      )
    );
    await axios.put(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/dashboard/orders`, request, { withCredentials: true });
  };
  return (
    <div className="overflow-x-auto mt-10 mb-10 w-full md:w-[80%] h-[80vh] p-5" style={{ scrollbarWidth: 'thin' }}>
      <table className="min-w-full border border-gray-200 bg-slate-900">
        <thead>
          <tr className="text-left text-white font-bold">
            <th className="py-2 px-4 border-b">Product</th>
            <th className="py-2 px-4 border-b">Customer</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Delivery</th>
          </tr>
        </thead>
        <tbody>
          {state.map((order) => (
            <tr key={order._id}>
              <td className="p-5 border-b bg-slate-600 text-white flex gap-2 items-center">
                <div className='w-8 h-8'>
                  <img src={order.productId.imgUrl} alt='product image' className='w-full' />
                </div>
                <p>{order.productId.productName}</p>
              </td>
              <td className="border-b bg-slate-600 text-white">
                <p>{order.fromUser.email}</p>
              </td>
              <td className="border-b bg-slate-600 text-white">
                <p>Nigeria</p>
              </td>
              <td className="border-b bg-slate-600 text-white">
                <p>{order.quantity}</p>
              </td>
              <td className="border-b bg-slate-600 text-white">
                <p>{order.status}</p>
              </td>
              <td className="border-b bg-slate-600 text-white pr-5">
                <select
                  onChange={(e) => handleDeliveryChange(order._id, e)}
                  value={order.delivery}
                  className="block w-full border bg-slate-600 p-2 focus:outline-none border-gray-300 rounded-md"
                >
                  <option>Received</option>
                  <option>Delivering</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
