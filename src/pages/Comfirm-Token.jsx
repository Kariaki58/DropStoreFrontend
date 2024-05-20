import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { comfirmToken } from '../store/comfirmToken/comfirmTokenPost';
import { useNavigate } from 'react-router';


const ComfirmToken = () => {
  const [token, setToken] = useState({ email_token: ''})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, status, error } = useSelector((state) => state.token)

  useEffect(() => {
    if (data === 'account created') {
      navigate('/', { replace: true });
    }
  }, [data, navigate]);

  const handleChange = (e) => {
    setToken({
      ...token,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(comfirmToken(token))
  }
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-xl font-semibold mb-4'>{data}</h1>
        <h1 className='text-xl font-semibold mb-4'>{status}</h1>
        <form onSubmit={handleSubmit}>
          <h1 className='text-2xl font-bold mb-6 text-center'>Confirmation Token</h1>
          <input
            name='email_token'
            value={token.email_token}
            onChange={handleChange}
            type='text'
            placeholder='Enter your 6 digit token'
            className='block w-full border-2 border-slate-700 py-2 px-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
          <button className='w-full p-3 bg-blue-600 text-white rounded-full mt-5 hover:bg-blue-700 transition duration-300'>
            Check
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComfirmToken;
