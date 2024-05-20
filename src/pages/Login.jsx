import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='m-auto max-w-lg mt-24 flex justify-center'>
      <div>
        <form className='w-full'>
              <h1>Sign In</h1>
              <label htmlFor='email' className='w-full block text-2xl'>Email address</label>
              <input name='email' className='block border-2 border-slate-700 py-2 px-1 font-bold mb-5' placeholder='Enter email'/>
              <label htmlFor='password' className='block text-2xl'>Password</label>
              <input name='password' className='block border-2 border-slate-700 py-2 px-1 font-bold' placeholder='Enter password'/>
              <button className='bg-blue-300 text-white p-3 mt-5'>Login</button>
          </form>
          <p>Don't have an account? <Link className='text-blue-700' to='/api/auth/sign-up'>sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;
