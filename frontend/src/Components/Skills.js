import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Skills.css";
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_BASE_URL;

  const baseURL = `${apiUrl}skills/`;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/skills`);
        console.log("Response data:", response.data);
        setSkills(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const renderStars = (masteryLevel) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < masteryLevel) {
        stars.push(<span key={i} className="star2 filled">★</span>);
      } else {
        stars.push(<span key={i} className="star2">★</span>);
      }
    }
    return stars;
  };

  return (
    <section id="skills">
      <h2>Skills/Languages</h2>
      {loading ? (
        <div className="loading-container">
          <ClipLoader size={60} color={"#FFD700"} loading={loading} thickness={5} />
          <p className="p">Loading skills...</p>
        </div>
      ) : (
        <div className="skills-container">
          {skills.length > 0 && (
            <div className="skills-container">
              {skills.map((skill) => (
                <div key={skill.id} className="skill-card">
                  <div className="skill-logo-container">
                    <img
                      src={`${baseURL}${skill.imagePath}`}
                      alt={`${skill.name} logo`}
                      className="skill-logo"
                    />
                  </div>
                  <p className="skill-name">{skill.name}</p>
                  <div className="skill-level">{renderStars(skill.masteryLevel)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Skills;
