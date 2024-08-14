import React, { useState, useRef, useEffect } from 'react';
import '../CSS/ProjectList.css'; // Ensure you have this CSS file for styling

const ProjectCard = ({ project }) => {
  // Base URL for the backend (ensure this matches your backend URL)
  const apiUrl = process.env.REACT_APP_BASE_URL;

  const baseURL = `${apiUrl}uploads/`;
  const [showAlert, setShowAlert] = useState(false);
  const modalRef = useRef(null);

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAlert(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = (event) => {
    event.preventDefault();
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    window.open(project.link, '_blank');
  };

  return (
    <>
      {showAlert && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <p >The project may take 40-50 seconds to load as Render turns off service when site is not active. Kindly wait.</p>
            <button onClick={handleAlertClose} className='modalbutton'>OK & Proceed</button>
          </div>
        </div>
      )}
      <div className="project-card">
        {/* Construct the image URL */}
        <img src={`${baseURL}${project.image}`} alt={`${project.title} Project Header`} />
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
        <a href={project.link} onClick={handleLinkClick} target="_blank" rel="noopener noreferrer">
          View Project
        </a>
      </div>
    </>
  );
};

export default ProjectCard;
