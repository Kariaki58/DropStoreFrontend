import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FiDelete } from "react-icons/fi";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductPopUp = ({toggleModal, product, previewImage, setProduct, setPreviewImage}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
            console.log("something went wrong in the server")
          setError('Something went wrong in the server');
        }
    };
    
    const getSignatureForUpload = async (folder) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/gensignature`, { folder }, { withCredentials: true })
            return res.data
        } catch (error) {
            console.log(error.message)
            setError('Something went wrong in the server')
        }
    }

    const onChange = (e) => {
        setProduct({
            ...product, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (previewImage.length > 5) {
            alert('You are only allowed to upload a maximum of 5 images at a time');
            return;
        }
    
        try {
            const { timestamp: imgTimestamp, signature: imgSignature } = await getSignatureForUpload('images');
    
            let images = [];
    
            const uploadPromises = Array.from(previewImage).map(async (img) => {
                const imgUrl = await uploadFile(img, 'image', imgTimestamp, imgSignature);
                images.push(imgUrl);
                console.log("running...");
            });
    
            await Promise.all(uploadPromises);
    
            const url = product._id
              ? `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/upload/product/${product._id}`
              : `${import.meta.env.VITE_APP_BACKEND_BASEURL}/api/upload/product`;
    
            const method = product._id ? 'put' : 'post';
    
            const response = await axios[method](url, {
                imgUrls: images,
                ...product
            }, { withCredentials: true });
    
    
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success(response.data.msg);
            }
    
            setProduct({
                productName: '',
                productCategory: '',
                brand: '',
                price: '',
                instock: '',
                productVideo: '',
                productDescription: ''
            });
            setPreviewImage([]);
        } catch (error) {
            console.log(error);
            console.log(error.response.data.error);
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    

    const removeImageFromPreview = (index) => {
        setPreviewImage((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setPreviewImage(files);
    }
  return (
      <div
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 max-h-full bg-gray-900 bg-opacity-50"
        tabIndex="-1"
        aria-hidden="true"
        >
        <form onSubmit={handleSubmit} className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto h-[45rem] scrollbar-thin scrollbar-track-gray-300">
            <div className="relative card rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded">
                <h3 className="text-xl font-semibold text-gray-900">
                    Add product
                </h3>
                <button
                onClick={() => toggleModal(-1)}
                className="text-[#343A40] text-2xl bg-transparent rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center"
                aria-label="Close modal"
                >
                <MdClose className="w-10 h-10" />
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
                <div className='flex justify-between'>
                    <div>
                        <h1 className='text-[#343A40] font-semibold mb-2'>Product Name</h1>
                        <div><input name='productName' value={product.productName} onChange={onChange} placeholder='product name' className='border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300' required/></div>
                    </div>
                    <div>
                        <h1 className='text-[#343A40] font-semibold mb-2'>Category</h1>
                        <div>
                            <input name='productCategory' value={product.productCategory} onChange={onChange} placeholder='product category' className='border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300' required/>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='text-[#343A40] font-semibold mb-2'>Brand</h1>
                        <div><input name='brand' value={product.brand} onChange={onChange} placeholder='brand name' className='border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300' required/></div>
                    </div>
                    <div>
                        <h1 className='text-[#343A40] font-semibold mb-2'>Price</h1>
                        <div>
                            <input name='price' value={product.price} onChange={onChange} placeholder='product price' type='number' className='border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300' required/>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='text-[#343A40] font-semibold mb-2'>In stock</h1>
                        <div><input name='instock' value={product.instock} onChange={onChange} placeholder='product in stock' type='number' className='border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300' required/></div>
                    </div>
                    <div>
                        <h1 className='text-[#343A40] font-semibold mb-2'>Product video</h1>
                        <div>
                            <input name='productVideo' value={product.productVideo} onChange={onChange} type='url' placeholder='optional video url..' className='border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300'/>
                        </div>
                    </div>
                </div>
                <div>
                    <textarea name='productDescription' value={product.productDescription} onChange={onChange} className='border bg-transparent rounded-lg focus:outline-blue-300 w-full h-28 p-3' placeholder='product discription...' required></textarea>
                </div>                            
                <div class="w-full">
                    <div>
                        <input
                            className="border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300 w-full"
                            onChange={handleFileChange}
                            id="dropzone-file"
                            accept=".jpeg, .jpg, .png,video/*"
                            type="file"
                            multiple
                            required
                            />
                    </div>
                </div>
            </div>                                

            <div className="p-4 rounded-lg">
                {
                previewImage?.length > 0 && (
                <>
                    <h1 className="text-lg font-semibold mb-4 text-gray-700">Preview</h1>
                    <div className="flex gap-4 w-full overflow-x-auto p-4 h-40">
                        {Array.from(previewImage).map((imageurl, index) => (
                            
                            <div key={index} className="w-40 flex-shrink-0 relative h-full">
                                <img
                                src={imageurl instanceof File ? URL.createObjectURL(imageurl) : imageurl}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg border border-gray-300 hover:shadow-lg transition-shadow duration-300"
                                />
                                <FiDelete className='absolute top-0 right-0 m-2 text-xl hover:cursor-pointer text-[#343A40] card ' onClick={() => removeImageFromPreview(index)}/>
                            </div>
                        ))}
                    </div>
                </>
                )
                }
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded">
                <div>
                    <div>
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="submit"
                            >
                                Add product
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </form>
        </div>
  );
}

export default ProductPopUp;
