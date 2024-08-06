import React from 'react';
import '../CSS/Intro.css';

const generateStarStyles = () => {
  const stars = [];
  for (let i = 0; i < 200; i++) {
    const size = Math.random() * 3 + 1 + 'px';
    const top = Math.random() * 100 + 'vh';
    const left = Math.random() * 100 + 'vw';
    stars.push(
      <div
        className="star"
        key={i}
        style={{
          width: size,
          height: size,
          top: top,
          left: left,
          animationDelay: Math.random() * 5 + 's',
          animationDuration: Math.random() * 20 + 10 + 's', // Longer duration for slower movement
        }}
      ></div>
    );
  }
  return stars;
};
const ResumeButton = () => {
  const handleDownload = () => {
    console.log(process.env.REACT_APP_BASE_URL)

    window.open(`${process.env.REACT_APP_BASE_URL}public/resume.pdf`, '_blank');  };
  return (
    <button className="glow-on-hover" onClick={handleDownload}>View Resume</button>
  );
};
const Intro = () => {
  const stars = generateStarStyles();
    
  return (
    <section id="intro" className="intro animate__animated animate__fadeIn">
      {stars}
      <div className="intro-content">
        <div className="intro-text">
          <h1>Welcome to My Portfolio</h1>
          <p>I'm Rahul Gadekar, a Software Development Enthusiast</p>
          <ResumeButton />
        </div>
        <img src="pngwing.com.png" alt="Rahul Gadekar" className="hero-image" />
      </div>
    </section>
  );
};

export default Intro;
