import React from 'react';


// stripe cancelpage redirects here when the user clickes the back button in stripe
const CancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Payment Cancelled</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Your payment has been cancelled. Please try again.</p>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
