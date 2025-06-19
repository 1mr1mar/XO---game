import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 min-w-[280px] max-w-xs w-full relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          aria-label="إغلاق"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
