import React from 'react';
import { useState } from 'react';
const ProjectCard = ({ project }) => {
  // Base URL for the backend (ensure this matches your backend URL)
  const apiUrl=process.env.REACT_APP_BASE_URL;

  const baseURL = `${apiUrl}uploads/`;
  const [showAlert, setShowAlert] = useState(false);

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
    <div>
    {showAlert && (
        <div className="modal">
          <div className="modal-content">
            <p>The project may take 40-50 seconds to load as Render turns off service when site is not active. Kindly wait.</p>
            <button onClick={handleAlertClose}>OK</button>
          </div>
        </div>
      )}
    </div>
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
