import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logInAccount } from '../store/loginToken/loginTokenPost';

const Login = () => {
  const dispatch = useDispatch()
  const { status, data } = useSelector((state) => state.login)
  const [displayDuration, setdisplayDuration] = useState(true)


  const handleSubmit = (e) => {
    e.preventDefault()
    setdisplayDuration(true)
    dispatch(logInAccount(userData))
  }


  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (status === 'succeeded') {
        setTimeout(() => {
          setdisplayDuration(false)
        }, 1000);
    }
  }, [status])

  // in production remove the set time out
  useEffect(() => {
    if (data !== 'Invalid credentials' && status === 'succeeded') {
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 2000);
    } else {
    }
  }, [status])

  return (
    <div className='m-auto max-w-lg mt-24 flex justify-center px-4 md:px-0'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full'>
        {
          status === 'succeeded' && displayDuration && (
            <div className={`${ data === 'loged in successfull' ? 'bg-green-600' : 'bg-red-600' } absolute top-0 right-0 h-16 z-50 flex justify-center items-center`}>
              <h1 className='text-white p-4'>{ data }</h1>
            </div>
          )
        }
        <form className='w-full' onSubmit={handleSubmit}>
          <h1 className='text-3xl font-semibold mb-6 text-center'>Sign In</h1>
          <label htmlFor='email' className='block text-xl mb-2'>Email address</label>
          <input
            name='email'
            type='email'
            value={userData.email}
            onChange={handleChange}
            className='block w-full py-2 px-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
            placeholder='Enter email'
            required
          />
          <label htmlFor='password' className='block text-xl mb-2'>Password</label>
          <input
            name='password'
            value={userData.password}
            onChange={handleChange}
            type='password'
            className='block w-full py-2 px-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
            placeholder='Enter password'
            required
          />
          <button className='w-full bg-purple-700 text-white py-3 mt-5 rounded-lg font-semibold hover:bg-purple-900 transition duration-300'>Login</button>
        </form>
        <p className='mt-4 text-center'>Don't have an account? <Link className='text-purple-700 hover:underline' to='/api/auth/sign-up'>Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;
