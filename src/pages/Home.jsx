import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import images from '../assets/index'
import { getHomePageData } from '../store/home/homeGet';

// you have to handle the errors
const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { content, status, error } = useSelector((state) => state.home)
    useEffect(() => {
      dispatch(getHomePageData())
    }, [])

    const handleClick = (storeId) => {
      console.log(storeId)
      navigate(`/api/${storeId}/products`)
    }
  
  return (
    <div className='mx-auto w-[1100px] flex flex-wrap gap-3 mt-5'>
      {
        content.map((item) => (
          <div key={item._id} className='bg-purple-900 text-white' onClick={() => handleClick(item._id)}>
            <div>
              <img src={item.banner} width={240}/>
            </div>
            <div className='p-3'>
              <h1 className='font-bold text-2xl mb-2'>{ item.storeName }</h1>
              <div>
                <ul>
                  {
                    item.storeCategory.map((other, index) => (
                      <li key={index}>{ other }</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Home;
