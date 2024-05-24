import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { comfirmToken } from '../store/comfirmToken/comfirmTokenPost';
import { useNavigate } from 'react-router';


const ComfirmToken = () => {
  const [token, setToken] = useState({ email_token: ''})
  const [displayDuration, setdisplayDuration] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, status, error } = useSelector((state) => state.token)


  useEffect(() => {
    if (status === 'succeeded') {
        setTimeout(() => {
          setdisplayDuration(false)
        }, 1000);
    }
  }, [status])

  // in production remove the set time out
  useEffect(() => {
    if (data !== 'token not correct' && status === 'succeeded') {
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 2000);
    } else {
    }
  }, [status])
  
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

  useEffect(() => {
    if (data !== 'token not correct' && status === 'succeeded') {
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 2000);
    } else {
    }
  }, [status])


  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        {
          status === 'succeeded' && displayDuration && (
            <div className={`${ data === 'account created' ? 'bg-green-600' : 'bg-red-600' } absolute top-0 right-0 h-16 z-[500] flex justify-center items-center`}>
              <h1 className='text-white p-4'>{ data }</h1>
            </div>
          )
        }
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
