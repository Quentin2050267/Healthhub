import React from 'react';

/**
 * ModalAct component
 * Renders a modal with a close button and any children passed to it.
 * @param {function} onClose - Function to call when the modal is closed.
 * @param {React.ReactNode} children - The content to display inside the modal.
 * @returns {JSX.Element} - The rendered modal component.
 */
const ModalAct = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-2 right-3 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-900 transition-all"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalAct;