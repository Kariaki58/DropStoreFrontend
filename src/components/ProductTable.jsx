import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Fill } from "react-icons/ri";
import images from '../assets';
import '../pages/Home.css'
import { getUserUploads } from '../store/upload/allUserUpload/userUploadGet';

const ProductTable = () => {
    const [allStoreProduct, setAllStoreProduct] = useState([])
    const { content, loading } = useSelector((state) => state.userupload);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserUploads())
    }, [dispatch])

    useEffect(() => {
        setAllStoreProduct(content)
    }, [content])

  return (
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PRODUCT NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PRODUCT IMAGE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PRICE
                </th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {
            allStoreProduct.map((items, index) => (
                <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-bold">{items.productName}</div>
                    </td>
                    <td className="px-6 h-full relative overflow-hidden rounded-t-lg">
                        <div key={index} className='image-slide h-full'>
                            <img src={items.imgUrls[0]} alt='store images' className='w-full h-10 object-cover' />
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-bold">{items._id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-bold">${items.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                            <button className="flex items-center bg-blue-700 hover:bg-blue-900 text-white p-2 rounded-xl">
                                <TbEdit className="mr-1" />
                                Edit item
                            </button>
                            <button className="text-white hover:bg-red-900 bg-red-700 flex items-center p-2 rounded-xl">
                                <RiDeleteBin6Fill className="mr-1" />
                                Delete item
                            </button>
                        </div>
                    </td>
                </tr>  
            ))
        }
        </tbody>
    </table>
  );
}

export default ProductTable;
