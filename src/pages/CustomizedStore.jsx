import React from 'react';
import images from '../assets';
import ProductsInStore from './ProductsInStore';
import { Link } from 'react-router-dom';

const CustomizedStore = () => {
    const ChangeBanner = () => {
      document.getElementById('banner').click()
    }
    const handleImageClick = () => {
      document.getElementById('image').click();
    };
  return (
    <section>
        <div className='relative w-full h-[400px]'>
          <img
            src={images.laptop}
            alt="Banner"
            className='absolute inset-0 w-full h-full object-cover'
            onClick={ChangeBanner}
          />
        </div>
        <div className='flex justify-center'>
          <div className='flex flex-col items-center'>
            <form>
              <input className='text-center font-bold text-[4rem] text-purple-900 focus:outline-none' value='James Store'/>
            </form>
            <select className="block w-full border bg-purple-900 text-white text-xl font-bold p-5 focus:outline-none border-gray-300 rounded-md mt-5 mb-5">
              <option className='font-bold text-xl'>Kid Dress</option>
              <option className='font-bold text-xl'>Kitchen Utils</option>
              <option className='font-bold text-xl'>School items</option>
            </select>
            <input type='file' onClick={ChangeBanner} accept='image/*' id='banner' className='hidden'/>
            <div>
              <Link to='/api/store/upload/fill'>
                <button className='bg-purple-900 p-5 rounded-full text-white font-bold'>Upload New Product</button>
              </Link>
            </div>
          </div>
        </div>
        <ProductsInStore read={false} handleImageClick={handleImageClick} cursor='cursor-pointer' />
    </section>
  );
}

export default CustomizedStore;
