import React, { useState } from "react";
import "../CSS/Admin.css";

const AddCertificationForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [verifyLink, setVerifyLink] = useState("");
  const [image, setImage] = useState(null);
  const apiUrl=process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("verifyLink", verifyLink);
    if (image) {
      formData.append("image", image);
    }
  
    // Debugging logs
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    try {
      const response = await fetch(`${apiUrl}api/certifications`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Certification added successfully");
        setTitle("");
        setDescription("");
        setVerifyLink("");
        setImage(null);
      } else {
        alert("Error adding certification");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding certification");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="h1">Add Certification</h1>
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
        value={verifyLink}
        onChange={(e) => setVerifyLink(e.target.value)}
        placeholder="Verification Link"
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button type="submit">Add Certification</button>
    </form>
  );
};

export default AddCertificationForm;
