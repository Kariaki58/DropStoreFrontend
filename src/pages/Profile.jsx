import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userAddress from '../store/Address/address';


// address page, still on development
const AddressForm = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const dispatch = useDispatch();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(addUserAddress(formData)); // Adjust according to your actual action and logic
  };

  return (
    <div></div>
  );
};

export default AddressForm;
