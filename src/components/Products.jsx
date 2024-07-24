import React, { useState } from 'react';
import AddProductButton from './actionButtons/AddProductButton';
import ProductTable from './actionButtons/ProductTable';

const Products = ({ content, toggleModal }) => {
  return (
    <>
      <AddProductButton toggleModal={toggleModal} />
      <ProductTable content={content} isOpen={isOpen} toggleModal={toggleModal} />
    </>
  );
};

export default Products;
