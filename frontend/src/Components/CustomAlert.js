import React, { useEffect, useRef, useState } from "react";
import "../CSS/CustomAlert.css";

const CustomAlert = ({ message, onConfirm, onClose }) => {
  const alertRef = useRef(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (alertRef.current && !alertRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 500); // Delay matches the fade-out animation duration
  };

  return (
    <div className={`custom-alert1 ${closing ? 'closing' : ''}`}>
      <div className="custom-alert-intro" ref={alertRef}>
        <h3>Attention!</h3>
        <p>{message}</p>
        <div className="alert-button-container">
          <button className="alert-button" onClick={onConfirm}>
            OK & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
