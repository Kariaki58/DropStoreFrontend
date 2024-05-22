import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCartArrowDown, FaAffiliatetheme, FaBars } from 'react-icons/fa';
import images from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { logOutAccount } from '../store/logout/logoutPost';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data, error, status } = useSelector((state) => state.logout)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logOutAccount())
  }
  
  return (
    <header className='bg-purple-900'>
      <nav className='container flex justify-between m-auto items-center p-3'>
        <h1 className='text-white text-3xl cursor-default'>
          <Link to='/'>DropStore</Link>
        </h1>
        <div className='hidden md:flex w-[500px] bg-slate-600 rounded-lg relative'>
          <input className='w-[460px] py-3 px-2 font-medium focus:outline-none bg-slate-300 rounded-s-lg' />
          <FaSearch className='absolute right-3 top-3.5 text-xl' />
        </div>
        <ul className='hidden md:flex gap-5 items-center'>
          <li className='text-white font-bold text-xl cursor-pointer'>
              <Link to='/api/auth/login'>Login</Link>
          </li>
          <li className='text-white font-bold text-xl cursor-pointer' onClick={handleLogout}>
            Logout
          </li>
          <li><FaAffiliatetheme className='text-3xl text-white cursor-pointer' /></li>
          <li><FaCartArrowDown className='text-3xl text-white cursor-pointer' /></li>
          <li className='w-10'><img src={images.defaultImage} className='w-full rounded-full' /></li>
        </ul>
        <div className='md:hidden flex items-center'>
          <FaSearch className='text-white text-2xl mr-3 cursor-pointer' onClick={() => setIsSearchOpen(!isSearchOpen)} />
          <FaBars className='text-white text-2xl cursor-pointer' onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
      </nav>
      {isSearchOpen && (
        <div className='flex justify-center md:hidden'>
          <input className='w-[90%] py-3 px-2 font-medium focus:outline-none bg-slate-300 rounded-lg mb-2' />
        </div>
      )}
      {isSidebarOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50'>
          <div className='fixed top-0 left-0 w-3/4 max-w-xs h-full bg-white p-5 z-50'>
            <button className='mb-5' onClick={() => setIsSidebarOpen(false)}>Close</button>
            <ul className='flex flex-col gap-5'>
              <li className='text-black font-bold text-xl cursor-pointer'>
                <Link to='/api/auth/login' onClick={() => setIsSidebarOpen(false)}>Login</Link>
              </li>
              <li className='text-white font-bold text-xl cursor-pointer' onClick={handleLogout}>
                Logout
              </li>
              <li><FaAffiliatetheme className='text-3xl text-black cursor-pointer' /></li>
              <li><FaCartArrowDown className='text-3xl text-black cursor-pointer' /></li>
              <li className='w-10'><img src={images.defaultImage} className='w-full rounded-full' /></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
