import React, { useEffect, useState } from 'react';
import { Cart } from '../store/upload/cart/cart';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js'
import { ThreeDots } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';

const Carts = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.myCart);
  const [quantities, setQuantities] = useState({});
  const [render, setRender] = useState([]);

  useEffect(() => {
    dispatch(Cart());
  }, [dispatch]);

  useEffect(() => {
    if (cart?.msg) {
      setRender(cart.msg);
      const initialQuantities = cart.msg.reduce((acc, item) => {
        acc[item.productId._id] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cart, loading]);

  const handleAddToCart = async (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
    await axios.put(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart/incr`, { productId }, { withCredentials: true });
  };

  const makePayment = async () => {
    const stripe = await loadStripe(`${import.meta.env.VITE_APP_STRIPE_PUBLIC}`)
    
    const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/create-checkout-session`, { products: render }, { withCredentials: true })
    await stripe.redirectToCheckout({
      sessionId: response.data.id
    })
  }
  const handleDecrFromCart = async (productId) => {
    if (quantities[productId] <= 0) {
      return;
    }
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[productId] || 1) - 1;
      return {
        ...prevQuantities,
        [productId]: newQuantity < 0 ? 0 : newQuantity,
      };
    });
    await axios.put(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart/decr`, { productId }, { withCredentials: true });
  };

  const handleDelete = async (productId) => {
    setRender((prev) => {
      return prev.filter((item) => item.productId._id !== productId)
  });
    await axios.delete(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/cart/${productId}`, { withCredentials: true });
  };

  const calculateTotalPrice = () => {
    return render.reduce((total, item) => {
      const price = parseFloat(item.productId.price.replace('$', ''));
      return total + price * (quantities[item.productId._id] || 0);
    }, 0).toFixed(2);
  };

  if (loading) {
    return (
      <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
    )
  }

  return (
    <section className="container mx-auto p-5">
      <div className="grid gap-5">
        {render.map((item, index) => (
          <div key={index} className="flex flex-row max-custom-sm:flex-col sm:w-full justify-between bg-purple-900 text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center lg:w-1/2">
              <div className="h-24 w-24 lg:h-32 lg:w-32 overflow-hidden rounded-lg">
                <img src={item.productId.imgUrl} alt={item.productId.productName} className="h-full w-full object-cover"/>
              </div>
              <div className="ml-5">
                <h1 className="text-xl font-bold">{item.productId.productName}</h1>
                <p className="text-sm text-slate-300">Seller: {item.storeName}</p>
                <button onClick={() => handleDelete(item.productId._id)} className="mt-2 bg-slate-800 p-2 rounded-lg hover:bg-slate-700">Remove</button>
              </div>
            </div>
            <div className="flex flex-col justify-center mt-5 lg:mt-0 lg:ml-5">
              <h1 className="text-2xl font-bold">${(parseFloat(item.productId.price.replace('$', '')) * (quantities[item.productId._id] || 0)).toFixed(2)}</h1>
              <div className="flex items-center gap-3 mt-2">
                <button onClick={() => handleAddToCart(item.productId._id)} className="text-2xl font-bold bg-slate-800 p-2 rounded-lg hover:bg-slate-700">+</button>
                <span className="text-2xl font-bold">{quantities[item.productId._id]}</span>
                <button onClick={() => handleDecrFromCart(item.productId._id)} className="text-2xl font-bold bg-slate-800 p-2 rounded-lg hover:bg-slate-700">-</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-purple-900 w-40 h-40 rounded-full flex flex-col items-center justify-center p-4 text-white fixed bottom-10 right-10 shadow-lg">
        <h1 className="text-lg font-bold">${calculateTotalPrice()}</h1>
        <button onClick={makePayment} className="mt-2 bg-slate-700 hover:bg-slate-900 text-white font-semibold py-1 px-4 rounded">
          Checkout
        </button>
      </div>
    </section>
  );
};

export default Carts;
