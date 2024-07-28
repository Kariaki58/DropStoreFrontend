import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { getUserUploads } from '../../../store/upload/allUserUpload/userUploadGet';
import Products from '../../../components/products/Products';
import AddProductButton from '../../../components/actionButtons/AddProductButton';
import ProductTable from '../../../components/actionButtons/ProductTable';
import ProductPopUp from '../../../components/modal/ProductPopUp';

const ProductsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
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

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const { content, loading } = useSelector((state) => state.userupload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserUploads());
  }, [dispatch]);

  return (
    <div className="w-full p-1 relative md:w-[80%] h-[40rem]">
      <div className="bg-white p-5">
        <h1 className="text-2xl font-bold text-[#343A40] mb-5">All Products</h1>
        <AddProductButton toggleModal={toggleModal} />
      </div>
      <div className="overflow-x-auto border-b">
        <ProductTable content={content} />
      </div>
      <div className="flex text-[0.9rem] items-center text-[#343A40] bg-white px-4 justify-between">
        <div className="flex items-center text-[#343A40] bg-white py-4">
          <div className="flex items-center">
            <MdOutlineKeyboardArrowLeft className="text-3xl cursor-pointer" />
            <MdKeyboardArrowRight className="text-3xl cursor-pointer" />
          </div>
          <p>
            showing <span className="font-semibold">1-20</span> of{' '}
            <span className="font-semibold">2290</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center bg-blue-700 text-white p-2 rounded-xl hover:bg-blue-900">
            <MdOutlineKeyboardArrowLeft className="text-3xl cursor-pointer" /> Previous
          </button>
          <button className="flex items-center bg-blue-700 text-white p-2 rounded-xl hover:bg-blue-900">
            Next <MdKeyboardArrowRight className="text-3xl cursor-pointer" />
          </button>
        </div>
      </div>
      {isOpen && (
        <ProductPopUp
          toggleModal={toggleModal}
          product={product}
          setProduct={setProduct}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      )}
    </div>
  );
};

export default ProductsPage;
