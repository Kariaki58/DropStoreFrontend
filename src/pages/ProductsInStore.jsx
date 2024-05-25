import React, { useEffect } from 'react';
import images from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { getUserUploads } from '../store/upload/allUserUpload/userUploadGet';
import { ThreeDots } from 'react-loader-spinner';

function ProductsInStore() {
  const dispatch = useDispatch()
  const { content, status, error } = useSelector((state) => state.userupload)

  const handleImageClick = () => {
    document.getElementById('image').click();
  };
  useEffect(() => {
    dispatch(getUserUploads())
    console.log(content)
  }, [])

  const handleTextChange = () => {
    
  }
  const handleFileChange = () => {

  }

  return (
    <>
    <div className="max-w-[1100px] mx-auto grid grid-cols-5 gap-5">
        {
          content.map((items) => (
            <div className="max-w-md w-52 shadow-md rounded-md mt-5">
              <div>
                <img
                  src={items.imgUrl}
                  width={124}
                  onClick={handleImageClick}
                  className='cursor-pointer w-full'
                />
              </div>
              <form className="mt-2">
                <textarea
                  type="text"
                  value={items.productName}
                  name={items.productName}
                  className="border-none focus:outline-none resize-none block w-full p-2 rounded-md shadow-sm"
                  onClick={handleTextChange}
                ></textarea>
                <input
                  type="text"
                  value={items.price}
                  name={items.price}
                  className="border-none focus:outline-none block w-full py-2 pr-4 rounded-md shadow-sm text-end"
                  onClick={handleTextChange}
                />
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/*"
                  onClick={handleFileChange}
                />
              </form>
            </div>
          ))
        }
    </div>
    </>
  );
}

export default ProductsInStore;
