import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUserAccount } from '../store/user/userPost';


const Register = () => {
    const dispatch = useDispatch()
    const { error } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
      email: '',
      password: ''
    })

    const handleChange = (e) => {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createUserAccount(userData));
      if (!error) {
        navigate('/api/auth/comfirm-token')
      } 
    };

  return (
    <div className='m-auto max-w-lg mt-24 flex justify-center'>
      <div>
        { 
          error? <h1>There is an issue with your request</h1>: null
        }
        <form className='w-full' onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label htmlFor='email' className='w-full block text-2xl'>Email address</label>
            <input name='email' type='email' value={userData.email} onChange={handleChange} className='block border-2 border-slate-700 py-2 px-1 font-bold mb-5' placeholder='Enter email' required/>
            <label htmlFor='password' className='block text-2xl'>Password</label>
            <input type='password' value={userData.password} onChange={handleChange} name='password' className='block border-2 border-slate-700 py-2 px-1 font-bold' placeholder='Enter password' required/>
            <button className='bg-blue-300 text-white p-3 mt-5'>register</button>
          </form>
          <p>already have an account? <Link className='text-blue-700' to='/api/auth/login'>sign in</Link></p>
      </div>
    </div>
  );
}

export default Register;
