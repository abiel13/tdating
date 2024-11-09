// Modal.js
import React from 'react';

function Modal({ onClose, children }:any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="bg-white p-6 rounded-lg z-10 max-w-md mx-auto">
        {children}
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg mx-3   "
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
