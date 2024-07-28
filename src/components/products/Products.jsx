import React, { useState } from 'react';
import ProductTable from '../actionButtons/ProductTable';
import AddProductButton from '../actionButtons/AddProductButton';

const Products = ({ content, toggleModal }) => {
  return (
    <>
      <AddProductButton toggleModal={toggleModal} />
      <ProductTable content={content} isOpen={isOpen} toggleModal={toggleModal} />
    </>
  );
};

export default Products;
