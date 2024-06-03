import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getHomePageData } from '../store/home/homeGet';

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
    <div className='mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-wrap gap-4 mt-5'>
      {loading && <p>Loading...</p>}
      {loading && <p>{error}</p>}
      {content.map((item) => (
        <div
          key={item._id}
          className='w-full sm:w-1/2 lg:w-1/5 p-2 bg-purple-900 text-white rounded-lg cursor-pointer'
          onClick={() => handleClick(item._id)}
        >
          <div className='h-48 overflow-hidden rounded-t-lg'>
            <img src={item.banner} alt={`${item.storeName} banner`} className='w-full h-full object-cover' />
          </div>
          <div className='p-3'>
            <h1 className='font-bold text-xl sm:text-2xl mb-2'>{item.storeName}</h1>
            <div>
              <ul>
                {item.storeCategory.map((other, index) => (
                  <li key={index} className='text-sm sm:text-base'>{other}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
