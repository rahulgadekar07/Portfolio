import React from 'react';

const ProjectCard = ({ project }) => {
  // Base URL for the backend (ensure this matches your backend URL)
  const apiUrl=process.env.REACT_APP_BASE_URL;

  const baseURL = `${apiUrl}uploads/`;

  return (
    <div className="project-card">
      {/* Construct the image URL */}
      <img src={`${baseURL}${project.image}`} alt={`${project.title} Project Header`} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
      <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
    </div>
  );
};

export default ProjectCard;
