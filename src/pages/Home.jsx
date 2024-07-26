import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getHomePageData } from '../store/home/homeGet';
import axios from 'axios';
import './Home.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import ImagePreview from '../components/ImagePreview/ImagePreview';
import { ToastContainer, toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { Cart } from '../store/upload/cart/cart';
import { IoStarOutline } from "react-icons/io5";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content, loading, error } = useSelector((state) => state.home);
  const { cart } = useSelector((state) => state.myCart);
  const [displayImagePreview, setDisplayImagePreview] = useState([]);
  const [wishList, setWishList] = useState(new Set());
  const [clickedItems, setClickedItems] = useState(new Set());
  const [counts, setCounts] = useState({});

  useEffect(() => {
    dispatch(getHomePageData());
    dispatch(Cart());
  }, [dispatch]);

  useEffect(() => {
    if (cart?.msg) {
      const initialQuantities = cart.msg.reduce((acc, item) => {
        acc[item.productId._id] = item.quantity;
        return acc;
      }, {});
      setCounts(initialQuantities);
    }
  }, [cart]);

  const NavigateToProductPage = (storeId) => {
    navigate(`/api/${storeId}/products`);
  };

  const displayFull = (index) => {
    setDisplayImagePreview(content[index].imgUrls);
  };

  const onClose = () => {
    setDisplayImagePreview([]);
  };

  const AddToWishList = (id) => {
    setWishList(prev => {
      const newWishList = new Set(prev);
      if (newWishList.has(id)) {
        newWishList.delete(id);
      } else {
        newWishList.add(id);
      }
      return newWishList;
    });
  };

  const handleAddToCart = async (productId, storeId) => {
    setCounts((prev) => {
      const newCounts = { ...prev };
      if (!newCounts[productId]) {
        newCounts[productId] = 0;
      }
      newCounts[productId] += 1;
      return newCounts;
    });

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart`, { productId, storeId }, { withCredentials: true });
      if (typeof response.data.msg === 'number') {
        toast.success("Item added to cart");
        dispatch(Cart());
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleDecrFromCart = async (productId) => {
    setCounts(prev => {
      const newCounts = { ...prev };
      if (!newCounts[productId]) {
        newCounts[productId] = 0;
      }
      newCounts[productId] -= 1;
      if (newCounts[productId] < 0) {
        newCounts[productId] = 0;
      }
      return newCounts;
    });

    try {
      const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart/decr`, { productId }, { withCredentials: true });
      toast.success(response.data.msg);
      dispatch(Cart());
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleClick = (id) => {
    setClickedItems(prev => {
      const newClickedItems = new Set(prev);
      if (newClickedItems.has(id)) {
        newClickedItems.delete(id);
      } else {
        newClickedItems.add(id);
      }
      return newClickedItems;
    });
  };

  return (
    <>
      <ToastContainer />
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
                  className={`card w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 ${clickedItems.has(item._id) ? 'bg-blue-100' : 'bg-light-input-border'} text-dark-gray rounded-lg`}
                >
                  <div className='relative h-48 overflow-hidden rounded-t-lg'>
                    <div data-modal-target="select-modal" data-modal-toggle="select-modal" className='h-48 image-slider cursor-pointer' onClick={() => displayFull(index)}>
                      {item.imgUrls.map((image, index) => (
                        <div key={index} className='image-slide'>
                          <img src={image} alt={`${item.storeName} banner`} className='w-full h-full object-cover' />
                        </div>
                      ))}
                    </div>
                    <div className='cursor-pointer'>
                      <div className='bg-blue-800 absolute bottom-0 right-0 flex rounded-full items-center'>
                        <IoIosAddCircleOutline className='text-4xl text-white rounded-full' onClick={() => handleAddToCart(item._id, item.storeId)} />
                        {counts[item._id] ? (
                          <div className='flex items-center'>
                            <p className='ml-1 text-xl text-white'>{counts[item._id]}</p>
                            <IoIosRemoveCircleOutline className='text-4xl ml-1 text-white rounded-full' onClick={() => handleDecrFromCart(item._id)} />
                          </div>
                        ) : null}
                      </div>
                      {wishList.has(item._id) ? (
                        <FaHeart className='text-4xl absolute bottom-0 left-0 bg-blue-800 rounded-full text-red-800' onClick={() => AddToWishList(item._id)} />
                      ) : (
                        <CiHeart className='text-4xl absolute bottom-0 left-0 bg-blue-800 rounded-full' onClick={() => AddToWishList(item._id)} />
                      )}
                    </div>
                  </div>
                  <div className='mb-3 h-16 text-[#343A40] overflow-hidden cursor-pointer' onClick={() => NavigateToProductPage(item._id)}>
                    <p className='postBody h-full overflow-y-hidden'>
                      {item.productDescription.length <= 40 ? item.productDescription : `${item.productDescription.slice(0, 40)}...`}
                    </p>
                  </div>
                  <div className='flex justify-between text-[#343A40] cursor-pointer' onClick={() => NavigateToProductPage(item._id)}>
                    <div className='flex gap-1'>
                      <p>300 sold</p>
                      <p>*****</p>
                    </div>
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
        {displayImagePreview.length > 0 && (
          <ImagePreview displayImagePreview={displayImagePreview} onClose={onClose} />
        )}
      </div>
    </>
  );
};

export default Home;
