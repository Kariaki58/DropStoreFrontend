import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { Cart } from '../store/upload/cart/cart';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Carts = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.myCart);
  const [cartState, setCartState] = useState([]);

  useEffect(() => {
    dispatch(Cart());
  }, [loading]);

  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  return (
    <section>
      {loading ? (
        <p>Loading...</p>
      ) : (
        cartState.map((item, index) => (
          <div key={index} className='mx-auto mt-5 flex justify-between bg-purple-900 w-[60%] text-white h-28 relative'>
            <div className='flex'>
              <div>
                <img src={item.imgUrl} className='h-full w-full object-cover'/>
              </div>
              <div className='ml-5 flex flex-col justify-center'>
                <h1 className='font-bold'>{ item.productName }</h1>
                <h1 className='font-bold'><span className='text-slate-300'>seller:</span> {item.storeName}</h1>
                <div>
                  <button className='bg-slate-800 p-2 rounded-lg'>Remove</button>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center p-5'>
              <div>
                <h1 className='font-bold text-2xl'>{item.price}</h1>
                <div className='flex gap-3'>
                  <div>
                    <button className='font-bold text-2xl'>+</button>
                  </div>
                  <h1 className='font-bold text-2xl'>{item.quantity}</h1>
                  <div>
                    <button className='font-bold text-2xl'>-</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className='bg-purple-900 w-40 h-40 rounded-full flex flex-col items-center justify-center p-4 text-white fixed bottom-10 right-16'>
        <h1 className='text-center text-lg font-bold'>$500000</h1>
        <button className='mt-2 bg-slate-700 hover:bg-slate-900 text-white font-semibold py-1 px-4 rounded'>
          Checkout
        </button>
      </div>
    </section>
  );
}

export default Carts;
