import React from 'react';
import Searchbar from "./Searchbar";
import "./About.css";

function About() {
  return (
    <>
      <Searchbar />
      <div className="main">
        <div className="title">
          <h1>About</h1>
        </div>
        <div className="phone-image" style={{ display: 'flex', justifyContent: 'center', maxWidth: '100%' }}>
          <img src={`${process.env.PUBLIC_URL}/phone.png`} 
          className="centered-image" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      </div>
    </>
  );
}

export default About;