import Link from 'next/link';
import React from 'react';


const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold text-green-600">Payment Successful 🎉</h2>
        <p className="mt-4 text-gray-700">Thank you for subscribing! Your transaction was successful.</p>
        
        <div className="mt-6">
          <Link href="/dashboard" className="px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-200">
            Go href Dashboard
          </Link>
        </div>
    
      </div>
    </div>
  );
};

export default SuccessPage;
