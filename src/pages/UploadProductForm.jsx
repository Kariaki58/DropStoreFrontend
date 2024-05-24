import React from 'react';

const UploadProductForm = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <form className="space-y-4">
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload product Image</label>
          <input id="image" name="image" type="file" accept="image/*" multiple required className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="video" className="block text-sm font-medium text-gray-700">Upload Video</label>
          <input id="video" name="video" type="file" accept="video/*" className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input id="productName" name="productName" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
        </div>
        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Add a Description</label>
          <textarea id="productDescription" name="productDescription" rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Set Price</label>
          <input id="price" name="price" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">How many in stock</label>
          <input id="quantity" name="quantity" type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required/>
        </div>
        <div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default UploadProductForm;
