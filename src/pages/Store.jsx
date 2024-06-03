import React, { useEffect } from 'react';
import images from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { getUserUploads } from '../store/upload/allUserUpload/userUploadGet';
import { ThreeDots } from 'react-loader-spinner';


const Store = () => {
    const dispatch = useDispatch()
    const { content, loading, error } = useSelector((state) => state.userupload)

    useEffect(() => {
      dispatch(getUserUploads())
    }, [])
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
    <section className='relative'>
      {
          error && <div className='bg-red-700 w-96 border rounded-full left-52 absolute top-[-50px]'>
            <p className='p-3 text-center text-white'>{ error }</p>
          </div>
      }
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
              <h1 className='text-center font-bold text-[4rem] text-purple-900 focus:outline-none'>James Store</h1>
            </form>
            <div>
            </div>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto grid grid-cols-5 gap-5">
        {
          content.map((items) => (
            <div className="max-w-md w-52 shadow-md rounded-md mt-5">
              <div>
                <img
                  src={items.imgUrl}
                  width={124}
                  className='w-full'
                />
              </div>
              <div className="mt-2">
                <p className="border-none focus:outline-none resize-none block w-full p-2 rounded-md shadow-sm">
                  {items.productName}
                </p>
                <p className="border-none focus:outline-none block w-full py-2 pr-4 rounded-md shadow-sm text-end">{items.price}</p>
          
              </div>
              <div className='flex justify-center py-2'>
                <button className="bg-purple-900 text-white px-4 py-2 rounded-md shadow-md block">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        }
    </div>
    </section>
  );
}

export default Store;


