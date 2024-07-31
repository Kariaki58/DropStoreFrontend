import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { resetLogin } from '../../store/actions';
import { useAuth } from '../../session/authentication/sessionAuth';
import axios from 'axios';


const Login = () => {
  const isAuthenticated = useIsAuthenticated();
  const signIn = useSignIn();
  const { sessionLogin } = useAuth();
  const { loading, data, token, error } = useSelector((state) => state.login);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sessionLogin(userData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [isAuthenticated])


  useEffect(() => {
    dispatch(resetLogin())
  }, [navigate, data, error])

  useEffect(() => {
    if (!loading) {
      if (data) {
        toast.success(data);
        if (token) {
          signIn({
            auth: {
              token: token,
              type: 'Bearer'
            },
            userState: {
              email: userData.email
            }
          });
        }
      } else if (error) {
        toast.error(error);
      }
    }
  }, [loading, data, error, token]);

  const signInWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/auth/google`;
  };
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <ToastContainer />
        <form className='w-full' onSubmit={handleSubmit}>
          <h1 className='text-3xl font-semibold mb-6 text-center'>Sign In</h1>
          <label htmlFor='email' className='block text-xl mb-2'>Email address</label>
          <input
            name='email'
            type='email'
            value={userData.email}
            onChange={handleChange}
            className='block w-full py-2 px-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
            placeholder='Enter email'
            required
          />
          <label htmlFor='password' className='block text-xl mb-2'>Password</label>
          <input
            name='password'
            value={userData.password}
            onChange={handleChange}
            type='password'
            className='block w-full py-2 px-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
            placeholder='Enter password'
            required
          />
          <button className='w-full bg-blue-700 text-white py-3 mt-5 rounded-lg font-semibold hover:bg-darker-teal transition duration-300'>
          Login
          </button>
        </form>
        <button class="flex w-full mt-5 items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-3 text-sm font-medium text-gray-800  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={signInWithGoogle}>
          <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
          <span>Continue with Google</span>
        </button>
        <p className='mt-4 text-center'>Don't have an account? <Link className='text-dark-teal hover:underline hover:text-light-teal' to='/api/auth/sign-up'>Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
