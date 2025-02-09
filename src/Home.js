import React, { useState } from 'react';
import Searchbar from "./Searchbar";
import "./Home.css";

function Home() {
  const [redditResults, setRedditResults] = useState([]);
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [query, setQuery] = useState("how to deal with a long day at work");
  const [selectedResult, setSelectedResult] = useState('');
  const [summary, setSummary] = useState('');
  async function fetchRedditTopResults(query) {
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=relevance&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.data.children.map((item) => item.data.title) || [];
    } catch (error) {
      return ["Error fetching Reddit data"];
    }
  }

  async function fetchYouTubeTopResults(query) {
    const apiKey = 'AIzaSyCpxYDDwtfCsvRTmcrj9ahhdwhVK7bwYR8';
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=5&type=video&safeSearch=strict&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.items?.map((item) => item.snippet.title) || [];
    } catch (error) {
      return ["Error fetching YouTube data"];
    }
}
  const handleIconHover = async (platform) => {
    setSelectedResult(platform);
    if (platform === "Reddit") {
      const reddit = await fetchRedditTopResults(query);
      setRedditResults(reddit);
    } else if (platform === "YouTube") {
      const youtube = await fetchYouTubeTopResults(query);
      setYoutubeResults(youtube);
      fetchTranscript(query);
    }
  };

  function fetchTranscript(query) {
    try {
      // Encode the query to safely include it in the URL.
      const response =  fetch(`/api/transcript/${encodeURIComponent(query)}`);
      const data =  response;
      console.log(data.summary); 
      // This contains the summary generated from the transcript.
      setSummary(data.summary);
    } catch (error) {
      console.error("Error fetching transcript:", error);
      return null;
    }
  }

  function redirectToAbout() {
    window.location.href = "/#about";
    }
  
    function redirectToYoutube() {
      window.location.href = "/#Youtube";
  }
  return (
    <>
      <Searchbar setQuery={setQuery} />
      <div className="main">
        <div className="title">
          <h1>Results for: {query}</h1>
        </div>

        <div className="icon-select" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <img
            src={`${process.env.PUBLIC_URL}/redditicon.png`}
            alt="Reddit"
            className="reddit-icon"
            onClick={redirectToAbout}
            onMouseOver={() => handleIconHover("Reddit")}
            style={{ width: '100px', height: '100px', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = 0.7;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/youtubeicon.png`}
            alt="YouTube"
            className="youtube-icon"
            onClick={redirectToYoutube}
            onMouseOver={() => handleIconHover("YouTube")}
            style={{ width: '100px', height: '100px', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = 0.7;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
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
    <div className = "title">
    <button className = "button" onClick={fetchTranscript}>Get Transcript Summary</button>
        {summary && (
          <div>
            <h3>Transcript Summary:</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{summary}</pre>
          </div>
        )}
    </div>
    <div>
      <h2 className="title">Transcript Summary:</h2>
      <p>{summary}</p>
    </div>
    </ul>
    </div>
    </div>
    </>
  );
}

export default Home;


