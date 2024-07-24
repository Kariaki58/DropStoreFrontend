import React from 'react';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";

const AddProductButton = ({ toggleModal }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
        <input
          placeholder="Search for product"
          className="card placeholder:text-[#94949c] w-[300px] py-3 px-2 font-medium text-[#343440] focus:outline-blue-300 focus:border-none rounded-lg border"
        />
        <IoMdSettings className="text-3xl text-[#343A40] cursor-pointer" />
        <RiDeleteBin5Fill className="text-3xl text-[#343A40] cursor-pointer" />
      </div>
      <div className="flex">
        <button
          className="flex bg-blue-700 hover:bg-blue-900 rounded-xl p-2 text-white items-center gap-2"
          onClick={() => toggleModal()}
        >
          <p className="font-bold text-2xl">+</p>
          <p>Add product</p>
        </button>
      </div>
    </div>
  );
};

export default AddProductButton;
