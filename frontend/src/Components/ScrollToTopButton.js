// ScrollToTopButton.js
import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Show the button when scrolled 300px from the top
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#333', // Dark background
          color: '#fff', // White text color
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
          cursor: `url('../../public/icons8-hand-cursor-20.png'), 'pointer'`,
          fontSize: '18px',
          transition: 'background-color 0.3s, box-shadow 0.3s',
          marginBottom:'2rem',
          zIndex:'1000'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#555'; // Darker shade on hover
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.7)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#333'; // Original background color
          e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.5)';
        }}
      >
        &#8679; {/* Unicode arrow up */}
      </button>
    )
  );
};

export default ScrollToTopButton;
