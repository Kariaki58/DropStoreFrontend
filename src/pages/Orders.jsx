import React from 'react';

const Orders = () => {
  return (
    <div className="overflow-x-auto mt-10 mb-10 w-[80%] p-5" style={{ scrollbarWidth: 'thin' }}>
    <table className="min-w-full border border-gray-200 bg-slate-900 ">
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
  );
}

export default Orders;
