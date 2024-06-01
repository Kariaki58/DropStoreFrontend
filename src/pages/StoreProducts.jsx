import React, { useEffect, useState } from 'react';
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
    dispatch(addToCart(request));
  };

  if (!loading) {
    return (
      <div>Loading</div>
    )
  }
  return (
    <>
      <div className='relative w-full h-screen'>
        {
          error && <div className='bg-red-700 w-96 border rounded-full left-52 absolute top-[-50px]'>
            <p className='p-3 text-center text-white'>{ error }</p>
          </div>
        }
        <img
          src={data.banner}
          alt="Banner"
          className='absolute inset-0 w-full h-full object-cover'
        />
      </div>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center'>
          <form>
            <h1 className='text-center font-bold text-4xl text-purple-900 focus:outline-none'>{data.storeName}</h1>
          </form>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data && data.msg && data.msg.map((item) => (
          <div key={item._id} className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full shadow-md rounded-md mt-5">
            <div>
              <img
                src={item.imgUrl}
                className="w-full h-64 object-cover rounded-t-md"
                alt={item.productName}
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold">{item.productName}</p>
              <p className="text-gray-600">Price: {item.price}</p>
            </div>
            <div className='flex justify-center py-2'>
              <button onClick={() => handleAddToCart(item._id)} className="bg-purple-900 text-white px-4 py-2 rounded-md shadow-md">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StoreProducts;
