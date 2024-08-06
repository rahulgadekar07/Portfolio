import React, { useState } from "react";
import "../CSS/AddSkills.css";

const AddSkillForm = () => {
  const [skillName, setSkillName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [masteryLevel, setMasteryLevel] = useState(0);
  const apiUrl=process.env.REACT_APP_BASE_URL;
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      setImageFile(file);
    } else {
      alert("Please upload a PNG file.");
      e.target.value = null; // Reset the input value
    }
  };

  const handleStarClick = (rating) => {
    setMasteryLevel(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please upload a PNG file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", skillName);
    formData.append("skillImage", imageFile); // Ensure this matches the backend's expected field name
    formData.append("masteryLevel", masteryLevel);

    // Log formData values
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(`${apiUrl}api/skills`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Skill added successfully");
        setSkillName('');
        setImageFile(null);
        setMasteryLevel(0);
      } else {
        alert("Error adding skill");
      }
    } catch (error) {
      console.error('Error adding skill:', error);
      alert("Error adding skill");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="h1">Add Skill</h1>
      <input
        type="text"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        placeholder="Skill Name"
        required
      />
      <input
        type="file"
        accept=".png"
        onChange={handleFileChange}
        required
      />
      <div className="star-rating1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star1 ${star <= masteryLevel ? "filled" : ""}`}
            onClick={() => handleStarClick(star)}
          >
            ★
          </span>
        ))}
      </div>
      <button type="submit">Add Skill</button>
    </form>
  );
};

export default AddSkillForm;
