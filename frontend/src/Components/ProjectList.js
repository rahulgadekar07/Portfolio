import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import "../CSS/ProjectList.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const apiUrl=process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetch(`${apiUrl}api/projects`)
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <section id="projects">
      <h1>Projects</h1>
      <div className="projectList">
        <div className="projects-container">
          {projects.length === 0 ? (
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
