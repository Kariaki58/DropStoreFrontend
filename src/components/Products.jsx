import React, { useState } from 'react';
import { IoMdSettings } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdClose } from 'react-icons/md';
import { FiDelete } from "react-icons/fi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import images from '../assets';


const Products = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div className='w-full p-1 relative md:w-[80%] h-[40rem]'>
        <div className='bg-white p-5'>
            <h1 className='text-2xl font-bold text-[#343A40] mb-5'>All Products</h1>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <input placeholder='Search for product' className='card placeholder:text-[#94949c] w-[300px] py-3 px-2 font-medium text-[#343440] focus:outline-blue-300 focus:border-none rounded-lg border' />
                    <IoMdSettings className='text-3xl text-[#343A40] cursor-pointer'/>
                    <RiDeleteBin5Fill className='text-3xl text-[#343A40] cursor-pointer'/>
                </div>
                <div className='flex'>
                    <button className='flex bg-blue-700 hover:bg-blue-900 rounded-xl p-2 text-white items-center gap-2' onClick={toggleModal}>
                        <p className='font-bold text-2xl'>+</p>
                        <p>Add product</p>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div
                className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 max-h-full bg-gray-900 bg-opacity-50"
                tabIndex="-1"
                aria-hidden="true"
                >
                <div className="relative p-4 w-full max-w-2xl max-h-full overflow-y-auto h-[45rem] scrollbar-thin scrollbar-track-gray-300">
                    <div className="relative card rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Add product
                        </h3>
                        <button
                        onClick={toggleModal}
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
                                <div><input placeholder='product name' className='border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300'/></div>
                            </div>
                            <div>
                                <h1 className='text-[#343A40] font-semibold mb-2'>Category</h1>
                                <div>
                                    <input placeholder='product category' className='border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300'/>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <h1 className='text-[#343A40] font-semibold mb-2'>Brand</h1>
                                <div><input placeholder='brand name' className='border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300'/></div>
                            </div>
                            <div>
                                <h1 className='text-[#343A40] font-semibold mb-2'>Price</h1>
                                <div>
                                    <input placeholder='product price' type='number' className='border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300'/>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <h1 className='text-[#343A40] font-semibold mb-2'>In stock</h1>
                                <div><input placeholder='product in stock' type='number' className='border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300'/></div>
                            </div>
                            <div>
                                <h1 className='text-[#343A40] font-semibold mb-2'>Product video</h1>
                                <div>
                                    <input type='url' placeholder='optional video url..' className='border bg-transparent px-1 py-2 rounded-lg focus:outline-blue-300'/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <textarea className='border bg-transparent rounded-lg focus:outline-blue-300 w-full h-28 p-3' placeholder='product discription...'></textarea>
                        </div>
                        <div class="flex items-center justify-center w-full">
                            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer card">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, GIF, MP4 (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" multiple/>
                            </label>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg">
                        <h1 className="text-lg font-semibold mb-4 text-gray-700">Preview</h1>
                        <div className="flex gap-4 w-full overflow-x-auto p-4">
                            {Array(5).fill().map((_, index) => (
                                <div key={index} className="w-40 flex-shrink-0 relative">
                                    <img
                                    src={images.laptop}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-auto object-cover rounded-lg border border-gray-300 hover:shadow-lg transition-shadow duration-300"
                                    />
                                    <FiDelete className='absolute top-0 right-0 m-2 text-xl hover:cursor-pointer'/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded">
                        <div>
                            <div>
                                <button
                                    onClick={toggleModal}
                                    className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button"
                                    >
                                        Add product
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    </div>
                </div>
                </div>
            )}
        </div>
      <div className="overflow-x-auto border-b">
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
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-bold">Product 1</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-10">
                                <img src={images.laptop} className="h-full rounded-md" alt="Product" />
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-bold">18ab12p3fk1345</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-bold">$149</div>
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
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-bold">Product 1</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-10">
                                <img src={images.laptop} className="h-full rounded-md" alt="Product" />
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-bold">18ab12p3fk1345</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-bold">$149</div>
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
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-bold">Product 1</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-10">
                                <img src={images.laptop} className="h-full rounded-md" alt="Product" />
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-bold">18ab12p3fk1345</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-bold">$149</div>
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
                </tbody>
            </table>
        </div>
        <div className='flex items-center text-[#343A40] bg-white px-4 justify-between'>
            <div className='flex items-center text-[#343A40] bg-white py-4'>
                <div className='flex items-center'>
                    <MdOutlineKeyboardArrowLeft className='text-3xl cursor-pointer'/>
                    <MdKeyboardArrowRight className='text-3xl cursor-pointer'/>
                </div>
                <p>showing <span className='font-semibold'>1-20</span> of <span className='font-semibold'>2290</span></p>
            </div>
            <div className='flex gap-3'>
                <button className='flex items-center bg-blue-700 text-white p-2 rounded-xl hover:bg-blue-900'><MdOutlineKeyboardArrowLeft className='text-3xl cursor-pointer'/> Previous</button>
                <button className='flex items-center bg-blue-700 text-white p-2 rounded-xl hover:bg-blue-900'>Next <MdKeyboardArrowRight className='text-3xl cursor-pointer'/></button>
            </div>
        </div>
    </div>
  );
}

export default Products;
