import React, { useEffect, useState } from "react";
import "../CSS/Certifications.css";
import ImageModal from "./ImageModal";
import ClipLoader from "react-spinners/ClipLoader"; // Import the spinner

const apiUrl = process.env.REACT_APP_BASE_URL;

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const baseURL = `${apiUrl}certifications/`;

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch(`${apiUrl}api/certifications`);
        const data = await response.json();
        setCertifications(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching certifications:", error);
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };
console.log(certifications)
  return (
    <section id="certifications" className="certifications-section">
      <h2>Certifications</h2>
      {loading ? (
        <div className="loading-container">
          <ClipLoader size={60} color={"#FFD700"} loading={loading} thickness={5} />
          <p style={{color:'white'}}>Loading Certifications...</p>
        </div>
      ) : ( <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <div key={index} className="certification-card">
            <img
              src={`${baseURL}${cert.image}`}
              alt={cert.title}
              className="certificate-image"
              onClick={() => openModal(`${baseURL}${cert.image}`)}
              title="View Image" // Tooltip text
            />
            <h3>{cert.title}</h3>
            <p>{cert.description}</p>
            <div class="buttons_verify">
              <a
                href={`${cert.verifyLink}`}
                target="_blank"
                rel="noopener noreferrer"
                class="blob-btn"
              >
                Verify Certificate
                <span class="blob-btn__inner">
                  <span class="blob-btn__blobs">
                    <span class="blob-btn__blob"></span>
                    <span class="blob-btn__blob"></span>
                    <span class="blob-btn__blob"></span>
                    <span class="blob-btn__blob"></span>
                  </span>
                </span>
              </a>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <filter id="goo">
                  <feGaussianBlur
                    in="SourceGraphic"
                    result="blur"
                    stdDeviation="10"
                  ></feGaussianBlur>
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                    result="goo"
                  ></feColorMatrix>
                  <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                </filter>
              </defs>
            </svg>
          </div>
        ))}
      </div>)}
     
      {isModalOpen && (
        <ImageModal
          src={selectedImage}
          alt="Full size view"
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default Certifications;
