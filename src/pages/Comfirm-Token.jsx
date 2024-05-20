import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { comfirmToken } from '../store/comfirmToken/comfirmTokenPost';
import { useNavigate } from 'react-router';


const ComfirmToken = () => {
  const [token, setToken] = useState({ email_token: ''})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, status, error } = useSelector((state) => state.token)

  const handleChange = (e) => {
    setToken({
      ...token,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(comfirmToken(token))
    console.log('data', data)
    console.log(error)
    if (data === 'account cated') {
      navigate('/', { replace: true })
    }
  }
  return (
    <div className='h-screen flex justify-center items-center'>
      <div>
        <h1>
        {data}
        </h1>
        <h1>{status}</h1>
        <form onSubmit={handleSubmit}>
          <h1>comfirmation token</h1>
          <input name='email_token' value={token.email_token} onChange={handleChange} type='text' placeholder='enter your 6 digit token' className='block border-2 p-2' required/>
          <button className='p-3 bg-blue-950 rounded-full mt-5'>check</button>
        </form>
      </div>
    </div>
  );
}

export default ComfirmToken;
