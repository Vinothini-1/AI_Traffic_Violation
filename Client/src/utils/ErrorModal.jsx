import React from "react";

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-bold">{message}</h2>
        <p></p>
        <button onClick={onClose} className="mt-4 bg-pink-500 text-black px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;