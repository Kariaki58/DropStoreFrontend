import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { createUserAccount } from '../store/user/userPost';


// registration page
const Register = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [displayDuration, setdisplayDuration] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    comfirmPassword: '',
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setdisplayDuration(true);
    const { fullName, email, password } = userData;
    const request = {
      fullName,
      email,
      password,
    };
    if (password !== userData.comfirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    dispatch(createUserAccount(request));
  };

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setdisplayDuration(false);
      }, 1000);
    }
  }, [loading]);

  useEffect(() => {
    if (data === 'An email has been sent to you' && !loading) {
      setTimeout(() => {
        navigate('/api/auth/comfirm-token', { replace: true });
      }, 2000);
    }
  }, [loading]);

  return (
    <div className="m-auto max-w-lg mt-14 flex justify-center px-4 md:px-0">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        {!loading && displayDuration && (
          <div
            className={`${
              data === 'An email has been sent to you'
                ? 'bg-green-600'
                : 'bg-red-600'
            } absolute top-0 right-0 h-16 z-50 flex justify-center items-center`}
          >
            <h1 className="text-white p-4">{data}</h1>
          </div>
        )}
        <form className="w-full" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>
          <label htmlFor="email" className="block text-xl mb-2">
            full name
          </label>
          <input
            name="fullName"
            type="text"
            value={userData.fullName}
            onChange={handleChange}
            className="block w-full py-2 px-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your fullName"
            required
          />
          <label htmlFor="email" className="block text-xl mb-2">
            Email address
          </label>
          <input
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            className="block w-full py-2 px-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter email"
            required
          />
          <label htmlFor="password" className="block text-xl mb-2">
            Password
          </label>
          <input
            type="password"
            value={userData.password}
            onChange={handleChange}
            name="password"
            className={`block w-full py-2 px-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              passwordError
                ? 'border-red-600 focus:ring-red-500'
                : 'focus:ring-purple-500'
            }`}
            placeholder="Enter password"
            required
          />
          <label htmlFor="comfirmPassword" className="block text-xl mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            value={userData.comfirmPassword}
            onChange={handleChange}
            name="comfirmPassword"
            className={`block w-full py-2 px-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
              passwordError
                ? 'border-red-600 focus:ring-red-500'
                : 'focus:ring-purple-500'
            }`}
            placeholder="Confirm password"
            required
          />
          <button className="w-full bg-purple-700 text-white py-3 mt-5 rounded-lg font-semibold hover:bg-purple-900 transition duration-300">
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link className="text-purple-700 hover:underline" to="/api/auth/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
