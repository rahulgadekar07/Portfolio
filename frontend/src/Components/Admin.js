import React, { useState, useEffect } from "react";
import "../CSS/Admin.css";
import AddSkillForm from "./AddSkillsForm";
import ShowMessages from "../Components/ShowMessages";
import AddCertificationForm from "./AddCertificationForm";

const AddProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const apiUrl=process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("technologies", technologies);
    formData.append("link", link);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(`${apiUrl}api/projects`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Project added successfully");
        setTitle("");
        setDescription("");
        setTechnologies("");
        setLink("");
        setImage(null);
      } else {
        alert("Error adding project");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding project");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="h1">Add Project</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="text"
        value={technologies}
        onChange={(e) => setTechnologies(e.target.value)}
        placeholder="Technologies (comma-separated)"
        required
      />
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Project Link"
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button type="submit">Add Project</button>
    </form>
  );
};

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-content">
        <div>
          <AddProjectForm />
        </div>
        <div>
          <AddSkillForm />
        </div>
        <div>
          <AddCertificationForm/>
        </div>
      </div>

      <div>
        <ShowMessages />
      </div>
    </div>
  );
};

export default Admin;
