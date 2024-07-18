import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getHomePageData } from '../store/home/homeGet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

// Home page display content from database
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getHomePageData());
  }, [dispatch]);

  const handleClick = (storeId) => {
    navigate(`/api/${storeId}/products`);
  };

  return (
    <>
      <div className='flex'>
        <div className='w-64 bg-white text-[#343A40] p-4'>
          <ul className='leading-10'>
            <li className='mb-2'><Link href='/link1' className='hover:text-gray-300'>supermarket</Link></li>
            <li className='mb-2'><Link href='/link2' className='hover:text-gray-300'>home & office</Link></li>
            <li className='mb-2'><Link href='/link3' className='hover:text-gray-300'>Health & Beauty</Link></li>
            <li className='mb-2'><Link href='/link4' className='hover:text-gray-300'>Appliances</Link></li>
            <li className='mb-2'><Link href='/link4' className='hover:text-gray-300'>Computers</Link></li>
            <li className='mb-2'><Link href='/link4' className='hover:text-gray-300'>Phone & Tablets</Link></li>
            <li className='mb-2'><Link href='/link4' className='hover:text-gray-300'>Electronics</Link></li>
            <li className='mb-2'><Link href='/link4' className='hover:text-gray-300'>Fashion</Link></li>
            <li className='mb-2'><Link href='/link4' className='hover:text-gray-300'>Baby Products</Link></li>
            <li className='mb-2'><Link href='/link4' className='hover:text-gray-300'>Gaming</Link></li>
            <li className='mb-2'><Link href='/link4' className='hover:text-gray-300'>Sporting Goods</Link></li>
          </ul>
        </div>
        <div className='flex-1'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5'>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className='flex justify-center gap-10 mb-10'>
              <button className='bg-blue-700 text-white p-5 rounded-xl'>Product Image</button>
              <button className='bg-blue-300 text-white p-5 rounded-xl'>Product Content</button>
            </div>
            <div className='flex flex-wrap gap-4'>
              {content.map((item) => (
                <div
                  key={item._id}
                  className='card w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 bg-light-input-border text-dark-gray rounded-lg cursor-pointer'
                  onClick={() => handleClick(item._id)}
                >
                  <div className='h-48 overflow-hidden rounded-t-lg'>
                    <img src={item.imgUrl} alt={`${item.storeName} banner`} className='w-full h-full object-cover' />
                  </div>
                  <div className='mb-3'>
                  <p className='postBody text-[#343A40]'>
                    {(item.description).length <= 30 ? item.description :
                    `${(item.description).slice(0, 30)}...`
                    }
                  </p>
                  </div>
                  <div className='flex justify-between text-[#343A40]'>
                    <div className='flex gap-1'>
                      <p>300 sold</p>
                      <p>*****</p>
                    </div>
                    {/* price should be based on the country, not hard coded with dollar sign */}
                    <p>${item.price}</p> 
                  </div>
                  <div className='mt-2'>
                    <Link><p className='text-blue-800 text-sm'>{item.storeName}</p></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
