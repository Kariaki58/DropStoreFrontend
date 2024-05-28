import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaCartArrowDown, FaAffiliatetheme, FaBars } from 'react-icons/fa';
import images from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { Cart } from '../store/upload/cart/cart';
import { logOutAccount } from '../store/logout/logoutPost';


const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayDuration, setDisplayDuration] = useState(true);
  const { cart, loading } = useSelector((state) => state.myCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { data, status, error } = useSelector((state) => state.logout);

  useEffect(() => {
    dispatch(Cart());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logOutAccount());
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
    if (status === 'succeeded') {
      setTimeout(() => {
        setDisplayDuration(false);
      }, 1000);
    }
  }, [status]);

  useEffect(() => {
    if (data !== 'Failed to destroy session' && status === 'succeeded') {
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    }
  }, [status, data, navigate]);

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
    <header className='bg-purple-900'>
      {
        status === 'succeeded' && displayDuration && (
          <div className={`${ data === 'you are been loged out' ? 'bg-green-600' : 'bg-red-600' } absolute top-0 right-0 h-16 z-[10000] flex justify-center items-center`}>
            <h1 className='text-white p-4'>{ data }</h1>
          </div>
        )
      }
      <nav className='container flex justify-between m-auto items-center p-3'>
        <h1 className='text-white text-3xl cursor-default'>
          <Link to='/'>DropStore</Link>
        </h1>
        <div className='hidden md:flex w-[500px] bg-slate-600 rounded-lg relative'>
          <input className='w-[460px] py-3 px-2 font-medium focus:outline-none bg-slate-300 rounded-s-lg' />
          <FaSearch className='absolute right-3 top-3.5 text-xl' />
        </div>
        <ul className='hidden md:flex gap-5 items-center relative'>
          <li><FaAffiliatetheme className='text-3xl text-white cursor-pointer' /></li>
          <Link to='/api/carts'>
            <li className='relative'>
              <FaCartArrowDown className='text-3xl text-white cursor-pointer' />
              {
                loading && <span className='absolute top-[-10px] left-5 text-white bg-black rounded-full px-1 font-bold text-2xl'>{ cart.msg.length }</span>
              }
            </li>
            
          </Link>
          <li className='relative w-10' ref={dropdownRef}>
            <img
              src={images.defaultImage} 
              className='w-full rounded-full cursor-pointer' 
              onClick={toggleDropdown} 
            />
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-40'>
                <ul className='py-2'>

                  <li className='font-bold text-lg cursor-pointer p-3'><Link to='/api/dashboard'>Dashboard</Link></li>
                  <li className='font-bold text-lg cursor-pointer p-3'><Link to='/api/settings'>setting</Link></li>
                  <li className='font-bold text-lg cursor-pointer p-3'>
                    <Link to='/api/auth/login'>Login</Link>
                  </li>
                  <li className='font-bold text-lg cursor-pointer p-3' onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </li>
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
