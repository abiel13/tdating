// CancelPage.jsx
import Link from 'next/link';
import React from 'react';


const CancelPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg- text-white">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold text-red-600">Payment Canceled ❌</h2>
        <p className="mt-4 text-gray-700">It seems like you canceled the checkout process. No charges were made.</p>
        
        <div className="mt-6">
          <Link href="/dashboard/subscription" className="px-6 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition duration-200">
            Try Again
          </Link>
        </div>
        
        <div className="mt-4">
          <Link href="/dashboard" className="text-red-500 hover:underline">Back to Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
