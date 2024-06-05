import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userAddress from '../store/Address/address';


// address page, still on development
const AddressForm = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const dispatch = useDispatch();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(addUserAddress(formData)); // Adjust according to your actual action and logic
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Your Address</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input id="phoneNumber" onChange={handleFormChange} value={formData.phoneNumber} name="phoneNumber" type="tel" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea id="address" onChange={handleFormChange} value={formData.address} name="address" rows="3" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input id="city" onChange={handleFormChange} value={formData.city} name="city" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State/Province</label>
          <input id="state" onChange={handleFormChange} value={formData.state} name="state" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
          <input id="postalCode" onChange={handleFormChange} value={formData.postalCode} name="postalCode" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <input id="country" onChange={handleFormChange} value={formData.country} name="country" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        </div>
        <div>
          <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
