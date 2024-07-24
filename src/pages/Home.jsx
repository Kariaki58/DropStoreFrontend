import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getHomePageData } from '../store/home/homeGet';
import './Home.css'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling
import ImagePreview from '../components/ImagePreview/ImagePreview';
import { ToastContainer, toast } from 'react-toastify';


// Home page display content from database
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content, loading, error } = useSelector((state) => state.home);
  const [displayImagePreview, setDisplayImagePreview] = useState([])

  useEffect(() => {
    dispatch(getHomePageData());
  }, [dispatch]);

  const handleClick = (storeId) => {
    navigate(`/api/${storeId}/products`);
  };

  const displayFull = (index) => {
    setDisplayImagePreview(content[index].imgUrls)
    console.log(displayImagePreview)
  }

  const onClose = () => {
    setDisplayImagePreview([])
  }

  return (
    <>
      <div className='flex'>
        <div className='w-64 bg-white text-[#343A40] p-4'>
          <ul className='leading-10'>
            <li className='mb-2'><Link to='/link1' className='hover:text-gray-300'>Supermarket</Link></li>
            <li className='mb-2'><Link to='/link2' className='hover:text-gray-300'>Home & Office</Link></li>
            <li className='mb-2'><Link to='/link3' className='hover:text-gray-300'>Health & Beauty</Link></li>
            <li className='mb-2'><Link to='/link4' className='hover:text-gray-300'>Appliances</Link></li>
            <li className='mb-2'><Link to='/link5' className='hover:text-gray-300'>Computers</Link></li>
            <li className='mb-2'><Link to='/link6' className='hover:text-gray-300'>Phone & Tablets</Link></li>
            <li className='mb-2'><Link to='/link7' className='hover:text-gray-300'>Electronics</Link></li>
            <li className='mb-2'><Link to='/link8' className='hover:text-gray-300'>Fashion</Link></li>
            <li className='mb-2'><Link to='/link9' className='hover:text-gray-300'>Baby Products</Link></li>
            <li className='mb-2'><Link to='/link10' className='hover:text-gray-300'>Gaming</Link></li>
            <li className='mb-2'><Link to='/link11' className='hover:text-gray-300'>Sporting Goods</Link></li>
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
              {content.map((item, index) => (
                <div
                  key={item._id}
                  className='card w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 bg-light-input-border text-dark-gray rounded-lg'
                >
                  <div className='relative h-48 overflow-hidden rounded-t-lg'>
                    <div data-modal-target="select-modal" data-modal-toggle="select-modal" className='h-48 image-slider cursor-pointer' onClick={() => displayFull(index)}>
                      {
                        item.imgUrls.map((image, index) => (
                          <div key={index} className='image-slide'>
                            <img src={image} alt={`${item.storeName} banner`} className='w-full h-full object-cover' />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className='mb-3'>
                    <p className='postBody text-[#343A40]'>
                      {(item.productDescription).length <= 30 ? item.productDescription :
                      `${(item.productDescription).slice(0, 30)}...`
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
                    <p className='text-blue-800 text-sm' onClick={() => handleClick(item._id)}>
                      {item.storeName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {
          displayImagePreview.length && (
            <ImagePreview displayImagePreview={displayImagePreview} onClose={onClose}/>
          )
        }
      </div>
    </>
  );
};

export default Home;
