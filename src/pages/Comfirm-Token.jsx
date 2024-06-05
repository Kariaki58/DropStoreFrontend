import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { comfirmToken } from '../store/comfirmToken/comfirmTokenPost';
import { useNavigate } from 'react-router';


// comfirm token component
const ComfirmToken = () => {
  const [token, setToken] = useState({ email_token: ''})
  const [displayDuration, setdisplayDuration] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, loading, error } = useSelector((state) => state.token)

  useEffect(() => {
    if (!loading) {
      setdisplayDuration(false)
      if (localStorage.getItem('logout')) {
        localStorage.removeItem('auth')
        localStorage.setItem('auth', 'login')
      }
      navigate('/')
    }
  }, [loading])

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
    <div className='min-h-screen flex justify-center items-center p-4 sm:p-6'>
      <div className='bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md'>
        {
          !loading && displayDuration && (
            <div className={`${data === 'account created' ? 'bg-green-600' : 'bg-red-600'} absolute top-0 right-0 h-16 z-[500] flex justify-center items-center w-full`}>
              <h1 className='text-white p-4'>{data}</h1>
            </div>
          )
        }
        <h1 className='text-xl font-semibold mb-4'>{data}</h1>
        <form onSubmit={handleSubmit}>
          <h1 className='text-2xl font-bold mb-6 text-center'>Confirmation Token</h1>
          <input
            name='email_token'
            value={token.email_token}
            onChange={handleChange}
            type='text'
            placeholder='Enter your 6 digit token'
            className='block w-full border-2 border-slate-700 py-2 px-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
            required
          />
          <button className='w-full p-3 bg-purple-900 text-white rounded-full mt-5 hover:bg-purple-700 transition duration-300'>
            Check
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComfirmToken;
