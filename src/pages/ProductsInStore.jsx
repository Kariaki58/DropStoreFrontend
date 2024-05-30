import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserUploads } from '../store/upload/allUserUpload/userUploadGet';
import { ThreeDots } from 'react-loader-spinner';
import { modifyProduct } from '../store/upload/modifyUpload/modifyupload';
import axios from 'axios';


function ProductsInStore() {
  const dispatch = useDispatch();
  const { content, status } = useSelector((state) => state.userupload);
  const [products, setProducts] = useState([]);
  const [img, setImg] = useState(null)
  

  useEffect(() => {
    dispatch(getUserUploads());
  }, [dispatch]);

  useEffect(() => {
    setProducts(content);
  }, [content]);

  const handleImageClick = (index) => {
    document.getElementById(`image-${index}`).click();
  };

  const uploadFile = async (file, timestamp, signature) => {
    const folder = 'images';
    const data = new FormData();
    data.append('file', file);
    data.append('timestamp', timestamp);
    data.append('signature', signature);
    data.append('api_key', import.meta.env.VITE_APP_CLOUDINARY_API_KEY);
    data.append('folder', folder);

    try {
      const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
      const resourceType = 'image';
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const getSignatureForUpload = async (folder) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/gensignature`,
        { folder },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const signedUpload = async (img) => {
    const { timestamp: imgTimestamp, signature: imgSignature } = await getSignatureForUpload('images');
    const imgUrl = await uploadFile(img, imgTimestamp, imgSignature);
    return imgUrl;
  };

  const handleTextChange = async (e, index, productId) => {
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [e.target.name]: e.target.value };
    dispatch(modifyProduct(updatedProducts))
    setProducts(updatedProducts);
    await axios.put("http://localhost:5000/api/product/edit", { product: updatedProducts[index], productId }, { withCredentials: true })
  };

  const handleFileChange = async (e, index, productId) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file)
      const update = await signedUpload(file)
      const reader = new FileReader();
      
      reader.onload = () => {
        const updatedProducts = [...products];
        updatedProducts[index] = { ...updatedProducts[index], imgUrl: reader.result || update};
        setProducts(updatedProducts);
        dispatch(modifyProduct(updatedProducts))
      };
      reader.readAsDataURL(file);
      const updateProduct = {...products[index], imgUrl: update}
      await axios.put('http://localhost:5000/api/product/edit', { product: updateProduct, productId }, { withCredentials: true })
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
              onChange={(e) => handleTextChange(e, index, item._id)}
            ></textarea>
            <input
              type="text"
              value={item.price}
              name="price"
              className="border-none focus:outline-none block w-full py-2 pr-4 rounded-md shadow-sm text-end"
              onChange={(e) => handleTextChange(e, index, item._id)}
            />
            <input
              type="file"
              id={`image-${index}`}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, index, item._id)}
            />
          </form>
        </div>
      ))}
    </div>
  );
}

export default ProductsInStore;
