import React, { useState } from 'react';

const ImagePreview = ({ displayImagePreview, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? displayImagePreview.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === displayImagePreview.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div 
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="relative h-[80%] w-[80%] md:w-[50%] rounded-lg p-4 shadow-lg">
        <button 
        className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white hover:text-gray-800 text-5xl" 
        onClick={onClose}
        >
        &times;
        </button>
        <div className="flex flex-col items-center justify-center w-full h-full">
          {displayImagePreview.length > 0 ? (
            <>
              <div className="flex justify-center items-center h-[70%] w-[100%]">
                <img 
                  src={displayImagePreview[currentIndex]} 
                  alt={`Preview ${currentIndex}`} 
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex mt-4 justify-center w-full">
                <button 
                  className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button 
                  className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No images to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
