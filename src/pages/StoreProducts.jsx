import React, { useEffect, useState } from 'react';
import images from '../assets';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/upload/cartCount/addTocart';
import { StoreProductFetch } from '../store/upload/StoreProducts/StoreProduct';

const StoreProducts = () => {
    const dispatch = useDispatch();
    const { storeId } = useParams();
    const { loading, data, error } = useSelector((state) => state.storeproduct);
    
    useEffect(() => {
      dispatch(StoreProductFetch(storeId));
    }, []);

    const handleAddToCart = (productId) => {
      const request = { productId, storeId }
      console.log(request)
      dispatch(addToCart(request));
    };
    return (
      <>
        <div className='relative w-full h-screen'>
          <img
            src={data.banner}
            alt="Banner"
            className='absolute inset-0 w-full h-screen object-cover'
          />
        </div>
        <div className='flex justify-center'>
          <div className='flex flex-col items-center'>
            <form>
              <h1 className='text-center font-bold text-[4rem] text-purple-900 focus:outline-none'>{data.storeName}</h1>
            </form>
            <div>
            </div>
          </div>
        </div>
      <div className="max-w-[1100px] mx-auto grid grid-cols-5 gap-5">
        {
          data && data.msg && data.msg.map((item) => (
            <div key={item._id} className="max-w-md w-52 shadow-md rounded-md mt-5">
              <div>
                <img
                  src={item.imgUrl}
                  width={124}
                  className='w-full'
                  alt={item.productName}
                />
              </div>
              <div className="mt-2">
                <p className="border-none focus:outline-none resize-none block w-full p-2 rounded-md shadow-sm">
                  {item.productName}
                </p>
                <p className="border-none focus:outline-none block w-full py-2 pr-4 rounded-md shadow-sm text-end">{item.price}</p>
              </div>
              <div className='flex justify-center py-2'>
                <button onClick={() => handleAddToCart(item._id)} className="bg-purple-900 text-white px-4 py-2 rounded-md shadow-md block">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        }
      </div>
      </>
    );
}

export default StoreProducts;
