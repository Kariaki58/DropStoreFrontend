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
    <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {products.map((item, index) => (
        <div key={item._id} className="max-w-xs sm:max-w-md md:max-w-[300px] lg:max-w-[250px] xl:max-w-[200px] w-full shadow-md rounded-md mt-5">
          <div>
            <img
              src={item.imgUrl}
              onClick={() => handleImageClick(index)}
              className='cursor-pointer w-full h-40 sm:h-52 md:h-60 lg:h-48 xl:h-40 object-cover rounded-t-md'
              alt="Product"
            />
          </div>
          <form className="p-2">
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
