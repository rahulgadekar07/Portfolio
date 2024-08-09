import React, { useState } from 'react';
import '../CSS/ImageModal.css'; // Import your CSS file for styling

const ImageModal = ({ src, alt, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} />
        <button className="modal-close" onClick={onClose}>&times;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
