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
          <button className='w-full bg-light-teal text-white py-3 mt-5 rounded-lg font-semibold hover:bg-darker-teal transition duration-300'>
          Login
          </button>
        </form>
        <p className='mt-4 text-center'>Don't have an account? <Link className='text-dark-teal hover:underline hover:text-light-teal' to='/api/auth/sign-up'>Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
