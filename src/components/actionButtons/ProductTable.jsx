import React, { useState, useEffect } from 'react';
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ProductPopUp from '../modal/ProductPopUp';

const ProductTable = ({ content }) => {
  const [allStoreProduct, setAllStoreProduct] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [product, setProduct] = useState({
    productName: '',
    productCategory: '',
    brand: '',
    price: '',
    instock: '',
    productVideo: '',
    productDescription: ''
  });

  useEffect(() => {
    setAllStoreProduct(content);
  }, [content]);

  const [isOpen, setIsOpen] = useState(false);
  
  const toggleModal = (index) => {
    if (index === -1) {
        console.log("here")
        setIsOpen(prev => !prev)
        return
    }
    setPreviewImage(content[index]?.imgUrls)
    const { productName, productCategory, brand, price, 
        instock, productVideo, productDescription} = content[index]
    const newDict = { productName, productCategory, brand, price, 
        instock, productVideo, productDescription}

    setProduct(prev => newDict)
    setIsOpen(prev => !prev)
  };

  return (
    <>
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
            {allStoreProduct.map((items, index) => (
            <tr key={index} className="text-[0.9rem]">
                <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-[#343A40]">
                    {items.productDescription.length <= 30
                    ? items.productDescription
                    : `${items.productDescription.slice(0, 30)}...`}
                </div>
                </td>
                <td className="px-6 h-full relative overflow-hidden rounded-t-lg">
                <div key={index} className="image-slide h-full">
                    <img
                    src={items.imgUrls[0]}
                    alt="store images"
                    className="w-full h-10 object-cover"
                    />
                </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-[#343A40]">{items._id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-[#343A40]">${items.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                    <button className="flex items-center bg-blue-700 hover:bg-blue-900 text-white p-2 rounded-xl" onClick={() => toggleModal(index)}>
                    <TbEdit className="mr-1"/>
                    Edit item
                    </button>
                    <button className="text-white hover:bg-red-900 bg-red-700 flex items-center p-2 rounded-xl">
                    <RiDeleteBin6Fill className="mr-1" />
                    Delete item
                    </button>
                </div>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
        {isOpen && (
            <ProductPopUp
            toggleModal={toggleModal}
            product={product}
            setProduct={setProduct}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            />
      )}
    </>
  );
};

export default ProductTable;
