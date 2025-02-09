import React, { useState, useEffect } from 'react';
import Searchbar from "./Searchbar";
import "./About.css";
function About() {
  const [redditResults, setRedditResults] = useState([]);
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [query, setQuery] = useState("how to deal with a long day at work");
  const [selectedResult, setSelectedResult] = useState('');

  
  return (
    <>
    <Searchbar setQuery={setQuery} />
    <div className="main">
    <div className="title">
       <h1>About</h1>
    </div>
   
    </div>
    </>
  );
}

export default About