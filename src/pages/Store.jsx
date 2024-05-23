import React from 'react';
import images from '../assets';
import ProductsInStore from './ProductsInStore';


const Store = () => {
    const handleImageClick = () => {};
  return (
    <section>
        <div className='relative w-full h-[400px]'>
          <img
            src={images.laptop}
            alt="Banner"
            className='absolute inset-0 w-full h-full object-cover'
          />
        </div>
        <div className='flex justify-center'>
          <div className='flex flex-col items-center'>
            <form>
              <input className='text-center font-bold text-[4rem] text-purple-700 focus:outline-none' value='James Store' readOnly/>
            </form>
            <input type='file' accept='image/*' id='banner' className='hidden' readOnly/>
          </div>
        </div>
        <ProductsInStore read={true} handleImageClick={handleImageClick} cursor=''/>
    </section>
  );
}

export default Store;
