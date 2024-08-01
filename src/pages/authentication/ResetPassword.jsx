import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// may become a component soon
const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/password-reset`, {
        token,
        password,
      });
      toast.success(response.data.msg);
      setTimeout(() => {
        navigate('/api/auth/login');
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <ToastContainer />
        <form className='w-full' onSubmit={handleSubmit}>
          <h1 className='text-3xl font-semibold mb-6 text-center text-[#343A40]'>Reset Password</h1>
          <label htmlFor='password' className='block text-xl mb-2 text-[#343A40]'>New Password</label>
          <input
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='block w-full py-2 px-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
            placeholder='Enter new password'
            required
          />
          <label htmlFor='confirmPassword' className='block text-xl mb-2 text-[#343A40]'>Confirm Password</label>
          <input
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='block w-full py-2 px-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
            placeholder='Confirm new password'
            required
          />
          <button className='w-full bg-blue-700 text-white py-3 mt-5 rounded-lg font-semibold hover:bg-blue-800 transition duration-300'>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
