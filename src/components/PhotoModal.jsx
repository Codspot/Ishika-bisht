// components/PhotoModal.jsx
import { useState } from "react";

export default function PhotoModal({ visible, onClose, src, caption }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="max-w-4xl w-full max-h-screen p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl hover:text-pink-300 z-10"
        >
          <i className="fa-solid fa-times"></i>
        </button>
        <div className="w-full h-full relative">
          <img
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            src={src}
            alt="Memory"
          />
          <h2 className="text-center text-white font-dancing text-4xl mt-4">
            {caption}
          </h2>
        </div>
      </div>
    </div>
  );
}
