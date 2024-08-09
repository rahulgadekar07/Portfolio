import React, { useState, useEffect } from "react";
import "../CSS/Header.css";
import ImageModal from './ImageModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  let lastScrollTop = 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      setIsHeaderVisible(false);
    } else {
      // Scrolling up
      setIsHeaderVisible(true);
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isHeaderVisible ? "visible" : "hidden"}`}>
        {isModalOpen && (
        <ImageModal 
          src={selectedImage} 
          alt="Full size view" 
          onClose={closeModal} 
        />
      )}
      <h2 id="nameh2">
        {" "}
        <div>
          <img src="id_size_photo.jpeg" alt="myPhoto" id="myphoto"  onClick={() => openModal('id_size_photo.jpeg')}  />
        </div>
        <div>
        Rahul Gadekar

        </div>
      </h2>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="#projects" onClick={closeMenu}>
              Projects
            </a>
          </li>
          <li>
            <a href="#skills" onClick={closeMenu}>
              Skills
            </a>
          </li>
          <li>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
