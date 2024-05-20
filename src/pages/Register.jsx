import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUserAccount } from '../store/user/userPost';


const Register = () => {
    const dispatch = useDispatch()
    const { error } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [passwordError, setPasswordError] = useState('')
    const [userData, setUserData] = useState({
      email: '',
      password: '',
      comfirmPassword: ''
    })

    const handleChange = (e) => {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const { email, password } = userData
      const request = {
        email, password
      }
      if (password != userData.comfirmPassword) {
        setPasswordError('password did not match')
        return
      }
      dispatch(createUserAccount(request));
      if (!error) {
        navigate('/api/auth/comfirm-token')
      } 
    };

  return (
    <div className='m-auto max-w-lg mt-14 flex justify-center px-4 md:px-0'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full'>
        {error && <h1 className='text-red-500 mb-4'>There is an issue with your request</h1>}
        <form className='w-full' onSubmit={handleSubmit}>
          <h1 className='text-3xl font-semibold mb-6 text-center'>Sign Up</h1>
          <label htmlFor='email' className='block text-xl mb-2'>Email address</label>
          <input
            name='email'
            type='email'
            value={userData.email}
            onChange={handleChange}
            className='block w-full py-2 px-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter email'
            required
          />
          <label htmlFor='password' className='block text-xl mb-2'>Password</label>
          <input
            type='password'
            value={userData.password}
            onChange={handleChange}
            name='password'
            className={`block w-full py-2 px-3 mb-4 rounded-lg focus:outline-none focus:ring-2 ${passwordError ? 'border-red-600 focus:ring-red-500' : 'border-slate-700 focus:ring-blue-500'}`}
            placeholder='Enter password'
            required
          />
          <label htmlFor='comfirmPassword' className='block text-xl mb-2'>Confirm Password</label>
          <input
            type='password'
            value={userData.comfirmPassword}
            onChange={handleChange}
            name='comfirmPassword'
            className={`block w-full py-2 px-3 mb-4 rounded-lg focus:outline-none focus:ring-2 ${passwordError ? 'border-red-600 focus:ring-red-500' : 'border-slate-700 focus:ring-blue-500'}`}
            placeholder='Confirm password'
            required
          />
          <button className='w-full bg-purple-700 text-white py-3 mt-5 rounded-lg font-semibold hover:bg-purple-900 transition duration-300'>Register</button>
        </form>
        <p className='mt-4 text-center'>Already have an account? <Link className='text-blue-700 hover:underline' to='/api/auth/login'>Sign in</Link></p>
      </div>
    </div>
  );
}

export default Register;
