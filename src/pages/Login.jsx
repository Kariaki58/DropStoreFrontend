import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='m-auto max-w-lg mt-24 flex justify-center px-4 md:px-0'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full'>
        <form className='w-full'>
          <h1 className='text-3xl font-semibold mb-6 text-center'>Sign In</h1>
          <label htmlFor='email' className='block text-xl mb-2'>Email address</label>
          <input
            name='email'
            type='email'
            className='block w-full py-2 px-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter email'
            required
          />
          <label htmlFor='password' className='block text-xl mb-2'>Password</label>
          <input
            name='password'
            type='password'
            className='block w-full py-2 px-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter password'
            required
          />
          <button className='w-full bg-blue-500 text-white py-3 mt-5 rounded-lg font-semibold hover:bg-blue-600 transition duration-300'>Login</button>
        </form>
        <p className='mt-4 text-center'>Don't have an account? <Link className='text-blue-700 hover:underline' to='/api/auth/sign-up'>Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;
