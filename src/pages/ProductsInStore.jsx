import React from 'react';
import images from '../assets';

function ProductsInStore() {
  const handleImageClick = () => {
    document.getElementById('image').click();
  };

  const handleFileChange = (event) => {
    // Handle file change here
  };

  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-5 gap-5">
      <div className="max-w-md w-52 shadow-md rounded-md mt-5">
        <div>
          <img
            src={images.laptop}
            width={124}
            onClick={handleImageClick}
            className="cursor-pointer w-full"
          />
        </div>
        <form className="mt-2">
          <textarea
            type="text"
            value="Dell Latitude E7250 4 Generation"
            className="border-none focus:outline-none resize-none block w-full p-2 rounded-md shadow-sm"
          ></textarea>
          <input
            type="text"
            value="$200"
            className="border-none focus:outline-none block w-full py-2 pr-4 rounded-md shadow-sm text-end"
          />
          <input
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </form>
        <div className='flex justify-center py-2'>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md block">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="max-w-md w-52 shadow-md rounded-md mt-5 ">
      <div>
        <img
          src={images.laptop}
          width={124}
          onClick={handleImageClick}
          className="cursor-pointer w-full"
        />
      </div>
      <form className="mt-2">
        <textarea
          type="text"
          value="Dell Latitude E7250 4 Generation"
          className="border-none focus:outline-none resize-none block w-full p-2 rounded-md shadow-sm"
        ></textarea>
        <input
          type="text"
          value="$200"
          className="border-none focus:outline-none block w-full py-2 pr-4 rounded-md shadow-sm text-end"
        />
        <input
          type="file"
          id="image"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </form>
      <div className='flex justify-center py-2'>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md block">
            Add to Cart
          </button>
      </div>
    </div>
    <div className="max-w-md w-52 shadow-md rounded-md mt-5 ">
      <div>
        <img
          src={images.laptop}
          width={124}
          onClick={handleImageClick}
          className="cursor-pointer w-full"
        />
      </div>
      <form className="mt-2">
        <textarea
          type="text"
          value="Dell Latitude E7250 4 Generation"
          className="border-none focus:outline-none resize-none block w-full p-2 rounded-md shadow-sm"
        ></textarea>
        <input
          type="text"
          value="$200"
          className="border-none focus:outline-none block w-full py-2 pr-4 rounded-md shadow-sm text-end"
        />
        <input
          type="file"
          id="image"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </form>
      <div className='flex justify-center py-2'>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md block">
            Add to Cart
          </button>
      </div>
    </div>
    <div className="max-w-md w-52 shadow-md rounded-md mt-5 ">
      <div>
        <img
          src={images.laptop}
          width={124}
          onClick={handleImageClick}
          className="cursor-pointer w-full"
        />
      </div>
      <form className="mt-2">
        <textarea
          type="text"
          value="Dell Latitude E7250 4 Generation"
          className="border-none focus:outline-none resize-none block w-full p-2 rounded-md shadow-sm"
        ></textarea>
        <input
          type="text"
          value="$200"
          className="border-none focus:outline-none block w-full py-2 pr-4 rounded-md shadow-sm text-end"
        />
        <input
          type="file"
          id="image"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </form>
      <div className='flex justify-center py-2'>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md block">
          Add to Cart
        </button>
      </div>
    </div>
    <div className="max-w-md w-52 shadow-md rounded-md mt-5 ">
      <div>
        <img
          src={images.laptop}
          width={124}
          onClick={handleImageClick}
          className="cursor-pointer w-full"
        />
      </div>
      <form className="mt-2">
        <textarea
          type="text"
          value="Dell Latitude E7250 4 Generation"
          className="border-none focus:outline-none resize-none block w-full p-2 rounded-md shadow-sm"
        ></textarea>
        <input
          type="text"
          value="$200"
          className="border-none focus:outline-none block w-full py-2 pr-4 rounded-md shadow-sm text-end"
        />
        <input
          type="file"
          id="image"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </form>
      <div className='flex justify-center py-2'>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md block">
          Add to Cart
        </button>
      </div>
    </div>
    <div className="max-w-md w-52 shadow-md rounded-md mt-5 ">
      <div>
        <img
          src={images.laptop}
          width={124}
          onClick={handleImageClick}
          className="cursor-pointer w-full"
        />
      </div>
      <form className="mt-2">
        <textarea
          type="text"
          value="Dell Latitude E7250 4 Generation"
          className="border-none focus:outline-none resize-none block w-full p-2 rounded-md shadow-sm"
        ></textarea>
        <input
          type="text"
          value="$200"
          className="border-none focus:outline-none block w-full py-2 pr-4 rounded-md shadow-sm text-end"
        />
        <input
          type="file"
          id="image"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </form>
      <div className='flex justify-center py-2'>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md block">
          Add to Cart
        </button>
      </div>
    </div>
    <div className="max-w-md w-52 shadow-md rounded-md mt-5 ">
      <div>
        <img
          src={images.laptop}
          width={124}
          onClick={handleImageClick}
          className="cursor-pointer w-full"
        />
      </div>
      <form className="mt-2">
        <textarea
          type="text"
          value="Dell Latitude E7250 4 Generation"
          className="border-none focus:outline-none resize-none block w-full p-2 rounded-md shadow-sm"
        ></textarea>
        <input
          type="text"
          value="$200"
          className="border-none focus:outline-none block w-full py-2 pr-4 rounded-md shadow-sm text-end"
        />
        <input
          type="file"
          id="image"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </form>
      <div className='flex justify-center py-2'>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md block">
            Add to Cart
          </button>
        </div>
    </div>
    </div>
  );
}

export default ProductsInStore;
