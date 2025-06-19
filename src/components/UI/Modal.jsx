import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div 
        className="rounded-xl shadow-lg p-6 min-w-[280px] max-w-xs w-full relative animate-fadeIn"
        style={{
          backgroundColor: 'var(--bg1-theme)',
          border: `2px solid var(--line-theme)`
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-2xl font-bold focus:outline-none hover:opacity-70 transition-opacity"
          style={{ color: 'var(--text-theme)' }}
          aria-label="إغلاق"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
