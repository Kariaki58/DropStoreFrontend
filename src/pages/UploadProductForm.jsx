import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';

const UploadProductForm = () => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const [form, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    instock: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

  const uploadFile = async (file, type, timestamp, signature) => {
    const folder = type === 'image' ? 'images' : 'videos';

    const data = new FormData();
    data.append("file", file);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", import.meta.env.VITE_APP_CLOUDINARY_API_KEY);
    data.append("folder", folder);

    try {
      const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
      const resourceType = type === 'image' ? 'image' : 'video';
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      setError('Something went wrong in the server')
    }
  };

  const getSignatureForUpload = async (folder) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/gensignature`, { folder }, { withCredentials: true });
      return res.data;
    } catch (error) {
      setError('Something went wrong in the server')
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { timestamp: imgTimestamp, signature: imgSignature } = await getSignatureForUpload('images');
      const { timestamp: videoTimestamp, signature: videoSignature } = await getSignatureForUpload('videos');

      const imgUrl = await uploadFile(img, 'image', imgTimestamp, imgSignature);
      const videoUrl = await uploadFile(video, 'video', videoTimestamp, videoSignature);

      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/upload/product`, { 
        imgUrl, videoUrl, ...form
      }, { withCredentials: true });

      setImg(null);
      setVideo(null);
      setFormData({
        productName: '',
        description: '',
        price: '',
        instock: 0,
      });

      setLoading(prev => !prev);
      navigate("/api/customize/store");
      setError(response.data.msg)
    } catch (error) {
      setLoading(prev => !prev);
      setFormData({
        productName: '',
        description: '',
        price: '',
        instock: 0,
      });
      setImg(null)
      setVideo(null)
      setError(error.response.data.error)
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md relative">
      {
        error && <div className={`color ${error === 'Product added to store' ?  'bg-green-700': 'bg-red-700'} w-96 border rounded-full left-52 absolute top-[-50px]`}>
          <p className='p-3 text-center text-white'>{ error }</p>
        </div>
      }
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload product Image</label>
          <input id="image" name="image" type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} required className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="video" className="block text-sm font-medium text-gray-700">Upload Video</label>
          <input id="video" name="video" type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input id="productName" value={form.productName} name="productName" type="text" onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" required/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Add a Description</label>
          <textarea id="description" value={form.description} name="description" rows="3" onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" required/>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Set Price</label>
          <input id="price" name="price" value={form.price} type="text" onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"/>
        </div>
        <div>
          <label htmlFor="instock" className="block text-sm font-medium text-gray-700">How many in stock</label>
          <input id="instock" name="instock" value={form.instock} type="text" onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" required/>
        </div>
        <div>
          <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
            {loading ? <ThreeDots color="#fff" height={10} /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadProductForm;
