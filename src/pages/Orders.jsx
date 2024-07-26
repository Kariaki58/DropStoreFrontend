import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../store/orders/orderGet';

const Orders = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders?.msg) {
      setState([...orders.msg]);
    }
  }, [orders]);

  const handleDeliveryChange = async (orderId, e) => {
    const updateStatus = e.target.value;
    const request = { orderId, value: updateStatus };

    setState((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, delivery: updateStatus } : order
      )
    );
    await axios.put(
      `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/dashboard/orders`,
      request,
      { withCredentials: true }
    );
  };

  return (
    <div className="overflow-x-auto mt-1 mb-10 w-full md:w-[80%] h-[80vh] px-1" style={{ scrollbarWidth: 'thin' }}>
      <div className="bg-white">
        <div className="flex justify-between items-center mb-5 p-3">
          <h1 className="text-[#343A40] text-3xl">Orders</h1>
          <div>
            <select className="block border p-2 focus:outline-none border-gray-300 rounded-md w-32">
              <option>today</option>
              <option>week</option>
              <option>month</option>
              <option>year</option>
            </select>
          </div>
        </div>
        <div className="mb-5 p-3 flex justify-between items-center">
          <div></div>
          <button className="bg-blue-700 text-white p-2 rounded-xl font-semibold hover:bg-blue-900 flex items-center gap-1">
            <input type="checkbox" className="w-4 h-4" /> group by location
          </button>
        </div>
      </div>

      <table className="min-w-full border border-gray-200 bg-[#FAFAFA] text-[#343A40]">
        <thead>
          <tr className="text-left font-bold">
            <th className="py-2 px-4 border-b">Product</th>
            <th className="py-2 px-4 border-b">Id</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Stage</th>
          </tr>
        </thead>
        <tbody>
          {state.map((order) => (
            <tr key={order._id} className=''>
              <td className="p-5 border-b flex gap-2 items-center">
                <div className="w-8 h-8">
                  <img src={order.productId.imgUrls[0]} alt="product" className="w-full" />
                </div>
                <p>{order.productId.productName}</p>
              </td>
              <td className="border-b">
                <p>{order.fromUser.email}</p>
              </td>
              <td className="border-b">
                <p>Nigeria</p>
              </td>
              <td className="border-b">
                <p>{order.quantity}</p>
              </td>
              <td className="border-b">
                <p>{order.status}</p>
              </td>
              <td className="border-b pr-5">
                <select
                  onChange={(e) => handleDeliveryChange(order._id, e)}
                  value={order.delivery}
                  className="block w-full border p-2 focus:outline-none border-gray-300 rounded-md"
                >
                  <option>Received</option>
                  <option>Shipped</option>
                  <option>In transit</option>
                  <option>Canceled</option>
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
