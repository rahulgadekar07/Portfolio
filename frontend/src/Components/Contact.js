import React, { useState } from "react";
import axios from "axios";
import "../CSS/Contact.css";
import Spinner from "./Spinner";

const Contact = () => {
  const apiUrl=process.env.REACT_APP_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [formStatus, setFormStatus] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.length > 1000) {
      errors.message = "Message cannot exceed 1000 characters";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}api/contact`,
        formData
      );
      setFormStatus("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      showAlert("success", "Message sent successfully! Check Your Inbox for Acknowledgement");
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus("Failed to send message. Please try again.");
      showAlert("error", "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type, message) => {
    const alertBox = document.createElement("div");
    alertBox.className = `custom-alert ${type}`;
    alertBox.innerText = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 3000);
  };

  return (
    <section id="contact">
      <h2>Contact</h2>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? "error" : ""}
            />
            {errors.subject && (
              <div className="error-message">{errors.subject}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? "error" : ""}
            ></textarea>
            {errors.message && (
              <div className="error-message">{errors.message}</div>
            )}
          </div>
          {loading ? <Spinner /> :  
          <button type="submit">
            Send Message
          </button>
          }
        </form>
        {/* {formStatus && <div className="form-status">{formStatus}</div>} */}
      </div>
    </section>
  );
};

export default Contact;
