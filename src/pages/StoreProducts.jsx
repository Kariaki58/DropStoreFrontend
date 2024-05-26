import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/upload/cart/addTocart';
import { StoreProductFetch } from '../store/upload/StoreProducts/StoreProduct';

const StoreProducts = () => {
    const dispatch = useDispatch();
    const { storeId } = useParams();
    const { loading, data, error } = useSelector((state) => state.storeproduct);
    
    useEffect(() => {
      dispatch(StoreProductFetch(storeId));
    }, []);

    const handleAddToCart = (productId) => {
      console.log(productId);
      dispatch(addToCart(productId));
    };

    return (
      <div className="max-w-[1100px] mx-auto grid grid-cols-5 gap-5">
        {
          data && data.map((item) => (
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
    );
}

export default StoreProducts;
