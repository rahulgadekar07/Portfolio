import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import "../CSS/ProjectList.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetch(`${apiUrl}api/projects`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setIsLoading(false); // Stop loading spinner after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setIsLoading(false); // Stop loading spinner even if there is an error
      });
  }, [apiUrl]);

  return (
    <section id="projects">
      <h1>Projects</h1>
      <div className="projectList">
        <div className="projects-container">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <p>No projects available.</p>
          ) : (
            projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
