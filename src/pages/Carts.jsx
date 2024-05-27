import React, { useEffect, useState } from 'react';
import { Cart } from '../store/upload/cart/cart';
import { useDispatch, useSelector } from 'react-redux';

const Carts = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.myCart);
  const [cartState, setCartState] = useState([]);

  useEffect(() => {
    dispatch(Cart());
  }, [dispatch]);

  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  return (
    <section className="container mx-auto p-5">
      {loading ? (
        <div className="grid gap-5">
          {cartState.map((item, index) => (
            <div key={index} className="flex flex-row max-custom-sm:flex-col sm:w-full justify-between bg-purple-900 text-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center lg:w-1/2">
                <div className="h-24 w-24 lg:h-32 lg:w-32 overflow-hidden rounded-lg">
                  <img src={item.imgUrl} alt={item.productName} className="h-full w-full object-cover"/>
                </div>
                <div className="ml-5">
                  <h1 className="text-xl font-bold">{item.productName}</h1>
                  <p className="text-sm text-slate-300">Seller: {item.storeName}</p>
                  <button className="mt-2 bg-slate-800 p-2 rounded-lg hover:bg-slate-700">Remove</button>
                </div>
              </div>
              <div className="flex flex-col justify-center mt-5 lg:mt-0 lg:ml-5">
                <h1 className="text-2xl font-bold">{item.price}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <button className="text-2xl font-bold bg-slate-800 p-2 rounded-lg hover:bg-slate-700">+</button>
                  <span className="text-2xl font-bold">{item.quantity}</span>
                  <button className="text-2xl font-bold bg-slate-800 p-2 rounded-lg hover:bg-slate-700">-</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">Loading...</p>
      )}
      <div className="bg-purple-900 w-40 h-40 rounded-full flex flex-col items-center justify-center p-4 text-white fixed bottom-10 right-10 shadow-lg">
        <h1 className="text-lg font-bold">$500000</h1>
        <button className="mt-2 bg-slate-700 hover:bg-slate-900 text-white font-semibold py-1 px-4 rounded">
          Checkout
        </button>
      </div>
    </section>
  );
}

export default Carts;
