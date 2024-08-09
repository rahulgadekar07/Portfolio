import React from "react";
import "../CSS/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="contact">
          <h3>Contact Me</h3>
          <p>
            <a href="mailto:r.a.gadekar804@gmail.com">
              <FontAwesomeIcon icon={faEnvelope} />
              r.a.gadekar804@gmail.com
            </a>
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} />
            (+91) 8265075994
          </p>
          <p className="phoneicon">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ "font-size": "20px", "margin-right": "10px" }}
            />
            878,Shaniwar Peth,Satara
          </p>
        </div>
      </div>
      <p className="copyright">&copy; 2024 Rahul Gadekar</p>
    </footer>
  );
};

export default Footer;
