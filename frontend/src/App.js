import React, { useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Intro from './Components/Intro';
import About from './Components/About';
import Footer from './Components/Footer';
import ProjectList from './Components/ProjectList';
import Admin from './Components/Admin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Skills from './Components/Skills';
import ScrollToTopButton from './Components/ScrollToTopButton';
import Contact from './Components/Contact';
import Certifications from './Components/Certifications';

function App() {
  

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<><Intro /><About /><ProjectList /><Certifications/><Skills/><Contact/><ScrollToTopButton/><Footer /></>} />
          <Route path="/admin" element={<Admin />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
