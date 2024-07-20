/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaCartArrowDown, FaAffiliatetheme, FaBars } from 'react-icons/fa';
import images from '../assets';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { MdMenu } from "react-icons/md";
import { CiBellOn } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { Cart } from '../store/upload/cart/cart';
import { revertAll, resetLogin } from '../store/actions';
import { useAuth } from '../session/authentication/sessionAuth';

// responsive user navigation
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayDuration, setDisplayDuration] = useState(true);
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.myCart);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [status, setStatus] = useState(false);
  const [errorOnLogout, setErrorOnLogout] = useState(null);
  const [logoutState, setLogoutState] = useState(null);
  const signOut = useSignOut()
  const {isSessionAuthenticated, sessionLogout} = useAuth()


  useEffect(() => {
      dispatch(Cart());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setDisplayDuration(false);
    }, 2000);
  }, [logoutState]);

  const handleLogout = async () => {
    const response = await sessionLogout();
    if (response.data.error) {
      setDisplayDuration(false);
      dispatch(revertAll())
      dispatch(resetLogin())
      setErrorOnLogout(response.data.error);
      return;
    }
    dispatch(revertAll())
    dispatch(resetLogin())
    setDisplayDuration(true);
    setLogoutState(response.data.msg);
    setStatus((prev) => !prev);
    signOut();

    // Navigate after signOut to ensure the session state is updated
    navigate('/api/auth/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className='bg-white border-b-2 shadow-sm'>
      {displayDuration && status && (
        <div className={`${logoutState === 'you are been loged out' ? 'bg-green-600' : 'bg-red-600'} absolute top-0 right-0 h-16 z-[10000] flex justify-center items-center`}>
        <div className="px-4 py-3 shadow-md" role="alert">
          <div className="flex">
            <div className="py-1"><svg className="fill-current h-6 w-6 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
            <div>
              <p className="font-bold text-[#343A40]">{logoutState}</p>
            </div>
          </div>
        </div>
        </div>
      )}
      {errorOnLogout && (
        <div className='bg-red-600'></div>
      )}
      <nav className='flex justify-between items-center p-1.5 mx-auto bg-[#1D5189] w-full'>
        <div className='flex gap-2'>
            <MdMenu className="w-[50px] h-[50px] text-white" />
          <h1 className='text-[#e9f0f7] text-3xl mt-1 font-bold'>
            <Link to='/'>DropStore</Link>
          </h1>
          <div className='hidden md:flex w-[500px] h-[40px] card rounded-lg relative border ml-[100px] mt-1'>
            <input placeholder='Search...' className='placeholder:text-[#343440] w-[150px] py-3 px-2 font-medium text-[#343440] focus:outline-none  rounded-l-lg bg-transparent' />
            <FaSearch className='absolute right-3 top-3.5 text-xl text-[#343A40] hover:cursor-pointer' />
          </div>
        </div>
        <ul className='hidden md:flex gap-5 items-center relative mr-[50px]'>
          <li ><FaAffiliatetheme className='text-3xl text-[#343A40] cursor-pointer ' /></li>
          <Link to='/api/carts'>
            <li className='relative'>
              <FaCartArrowDown className='text-3xl text-[#343A40] cursor-pointer' />
              {!loading && isSessionAuthenticated && cart && cart.msg && (
                <span className='absolute top-[-10px] left-5 text-white bg-black rounded-full px-1 font-bold text-sm'>{cart.msg.length}</span>
              )}
            </li>
          </Link>
          <li className='relative w-10' ref={dropdownRef}>
            <img
              src={images.defaultImage}
              className='w-full rounded-full cursor-pointer'
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className='absolute right-0 top-[2.6rem] mt-2 w-48 card border shadow-lg z-40'>
                <ul className='py-2'>
                  {!isSessionAuthenticated && (
                    <li className='font-bold text-lg hover:bg-[#DADADA] cursor-pointer p-3'>
                      <Link to='/api/auth/login'>Login</Link>
                    </li>
                  )}
                  {isSessionAuthenticated && (
                    <>
                      <li className='font-bold text-[#343A40] text-lg hover:bg-[#DADADA] cursor-pointer p-3'><Link to='/api/dashboard'>Dashboard</Link></li>
                      <li className='font-bold text-[#343A40] text-lg hover:bg-[#DADADA] cursor-pointer p-3'><Link to='/api/settings'>Settings</Link></li>
                      <li className='font-bold text-[#343A40] text-lg hover:bg-[#DADADA] cursor-pointer p-3' onClick={handleLogout}>
                        Logout
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </li>
        </ul>
        <div className='md:hidden flex items-center'>
          <FaSearch className='text-[#343A40] text-2xl mr-3 cursor-pointer' onClick={() => setIsSearchOpen(!isSearchOpen)} />
          <FaBars className='text-white text-2xl cursor-pointer' onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
      </nav>
      {isSearchOpen && (
        <div className='flex justify-center md:hidden'>
          <input placeholder='Search...' className='w-[90%] py-3 px-2 font-medium focus:outline-none bg-slate-300 rounded-lg mb-2' />
        </div>
      )}
      {isSidebarOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50'>
          <div className='fixed top-0 left-0 w-3/4 max-w-xs h-full bg-light-secondary-bg 0 p-5 z-50'>
            <button className='mb-5' onClick={() => setIsSidebarOpen(false)}>Close</button>
            <ul className='flex flex-col gap-5'>
              {!isSessionAuthenticated && (
                <li className='text-black font-bold text-xl cursor-pointer'>
                  <Link to='/api/auth/login' onClick={() => setIsSidebarOpen(false)}>Login</Link>
                </li>
              )}
              {isSessionAuthenticated && (
                <>
                  <li className='text-dark-gray font-bold text-xl cursor-pointer'>
                    <Link to='/api/dashboard' onClick={() => setIsSidebarOpen(false)}>Dashboard</Link>
                  </li>
                  <li className='text-dark-gray font-bold text-xl cursor-pointer'>
                    <Link to='/api/settings' onClick={() => setIsSidebarOpen(false)}>Settings</Link>
                  </li>
                  <li className='text-dark-gray font-bold text-xl cursor-pointer' onClick={handleLogout}>
                    Logout
                  </li>
                </>
              )}
              <li><FaAffiliatetheme className='text-3xl text-black cursor-pointer' /></li>
              <Link to='/api/carts'>
                <li className='relative'>
                  <FaCartArrowDown className='text-3xl text-black cursor-pointer' />
                  {!loading && cart && cart.msg && (
                    <span className='absolute top-[-10px] left-5 text-white bg-black rounded-full px-1 font-bold text-sm'>{cart.msg.length}</span>
                  )}
                </li>
              </Link>
              <li className='w-10'><img src={images.defaultImage} className='w-full rounded-full' /></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
