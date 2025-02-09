import React, { useState, useEffect } from 'react';
import Searchbar from "./Searchbar";
import "./Home.css";
function Home() {
    const [redditResults, setRedditResults] = useState([]);  // Changed to store an array of results
    const [youtubeResults, setYoutubeResults] = useState([]);  // Changed to store an array of results
    const [query, setQuery] = useState("how to deal with a long day at work");
    const [selectedResult, setSelectedResult] = useState(''); // New state for selected result

    async function fetchRedditTopResults(query) {
        const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=relevance&limit=5`;  // Increased limit to 5

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.data.children.map((item) => item.data.title) || [];  // Return array of titles
        } catch (error) {
            return ["Error fetching Reddit data"];
        }
    }

    async function fetchYouTubeTopResults(query) {
        const apiKey = 'AIzaSyArpkYy0rdZYLGp95ZjEY1BjGVoknoKi8I'; // Replace with your actual API key
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=5&type=video&videoDuration=long&safeSearch=strict&key=${apiKey}`; // Increased maxResults to 5, added type=video and videoDuration=long to filter for long videos and non-YouTube shorts

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.items?.map((item) => item.snippet.title) || [];  // Return array of video titles
        } catch (error) {
            return ["Error fetching YouTube data"];
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (selectedResult === "Reddit") {
                const reddit = await fetchRedditTopResults(query);
                setRedditResults(reddit);
            } else if (selectedResult === "YouTube") {
                const youtube = await fetchYouTubeTopResults(query);
                setYoutubeResults(youtube);
            }
        }

        fetchData();
    }, [query, selectedResult]);  // Run the effect whenever the query or selectedResult changes

    const handleSelectChange = (e) => {
        setSelectedResult(e.target.value);  // Update selectedResult based on dropdown selection
    };

    return (
      <>
      <Searchbar setQuery={setQuery} />
      <div className="main">
        <div className="title">
             <h1>Results for: {query}</h1>
        </div>
      
      
      <div className="icon-select" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      <img
      src= {`${process.env.PUBLIC_URL}/redditicon.png`}
      alt="Reddit"
      className="reddit-icon"
      onClick={() => setSelectedResult("Reddit")}
      style={{ width: '100px', height: '100px', cursor: 'pointer', transition: 'transform 0.2s' }} // Added inline styles for resizing, cursor pointer, and transition
      onMouseOver={(e) => {
      e.currentTarget.style.opacity = 0.7;
      e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseOut={(e) => {
      e.currentTarget.style.opacity = 1;
      e.currentTarget.style.transform = 'scale(1)';
      }}
      />
      <img
      src={`${process.env.PUBLIC_URL}/youtubeicon.png`}
      alt="YouTube"
      className="youtube-icon"
      onClick={() => setSelectedResult("YouTube")}
      style={{ width: '100px', height: '100px', cursor: 'pointer', transition: 'transform 0.2s' }} // Added inline styles for resizing, cursor pointer, and transition
      onMouseOver={(e) => {
      e.currentTarget.style.opacity = 0.7;
      e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseOut={(e) => {
      e.currentTarget.style.opacity = 1;
      e.currentTarget.style.transform = 'scale(1)';
      }}
      />
      </div>

      <div>
      {selectedResult && (
      <h2 className="title">{selectedResult} Results:</h2>
      )}

      <ul>
      {(selectedResult === "Reddit" ? redditResults : youtubeResults).map((result, index) => (
      <li key={index}>{result}</li>
      ))}
      </ul>
      </div>
      </div>
      </>
    );
}

export default Home