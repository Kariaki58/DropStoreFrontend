import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserUploads } from '../store/upload/allUserUpload/userUploadGet';
import { ThreeDots } from 'react-loader-spinner';
import { modifyProduct } from '../store/upload/modifyUpload/modifyupload';

function ProductsInStore() {
  const dispatch = useDispatch();
  const { content, status } = useSelector((state) => state.userupload);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(getUserUploads());
  }, [dispatch]);

  useEffect(() => {
    setProducts(content);
  }, [content]);

  const handleImageClick = (index) => {
    document.getElementById(`image-${index}`).click();
  };

  const handleTextChange = (e, index) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [e.target.name]: e.target.value };
    dispatch(modifyProduct(updatedProducts))
    setProducts(updatedProducts);
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedProducts = [...products];
        updatedProducts[index] = { ...updatedProducts[index], imgUrl: reader.result };
        setProducts(updatedProducts);
        dispatch(modifyProduct(updatedProducts))
      };
      reader.readAsDataURL(file);
    }
  };

  if (status === 'loading') {
    return <ThreeDots color="#fff" height={10} />;
  }
  
  return (
    <div className="max-w-[1100px] mx-auto grid grid-cols-5 gap-5">
      {products.map((item, index) => (
        <div key={item._id} className="max-w-md w-52 shadow-md rounded-md mt-5">
          <div>
            <img
              src={item.imgUrl}
              width={124}
              onClick={() => handleImageClick(index)}
              className='cursor-pointer w-full'
              alt="Product"
            />
          </div>
          <form className="mt-2">
            <textarea
              value={item.productName}
              name="productName"
              className="border-none focus:outline-none resize-none block w-full p-2 rounded-md shadow-sm"
              onChange={(e) => handleTextChange(e, index)}
            ></textarea>
            <input
              type="text"
              value={item.price}
              name="price"
              className="border-none focus:outline-none block w-full py-2 pr-4 rounded-md shadow-sm text-end"
              onChange={(e) => handleTextChange(e, index)}
            />
            <input
              type="file"
              id={`image-${index}`}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, index)}
            />
          </form>
        </div>
      ))}
    </div>
  );
}

export default ProductsInStore;
