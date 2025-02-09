import { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import { HashRouter, Routes, Route } from 'react-router-dom';
function App() {
  const [query, setQuery] = useState(""); // The search term entered by the user
  const [redditResult, setRedditResult] = useState(''); // Summary from Reddit
  const [youtubeResult, setYoutubeResult] = useState(''); // Summary from YouTube
  const [loading, setLoading] = useState(false); // Indicates if data is being fetched
  const [error, setError] = useState(null); // Stores any error message

  // This function fetches and returns a summary from a Reddit post.
  // It prefers the post's selftext, but falls back to the title if necessary.
  async function fetchRedditSummary(query) { 
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=relevance&limit=1`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Reddit API error");
      const data = await response.json();

      const post = data.data.children[0]?.data;
      if (post) {
        // Choose selftext if available; otherwise, use the title.
        const content = post.selftext && post.selftext.trim() !== "" ? post.selftext : post.title;
        // Truncate the content to 300 characters if it's too long.
        return content.length > 300 ? content.substring(0, 300) + "..." : content;
      }
      return "none found";
    } catch (error) {
      console.error("Reddit Fetch Error:", error);
      return "Error fetching Reddit summary";
    }
  }

  // This function fetches and returns a summary from a YouTube video.
  // It uses the video's description (truncated if necessary).
  async function fetchYouTubeSummary(query) {
    const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with your actual API key
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=1&key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("YouTube API error");
      const data = await response.json();

      const snippet = data.items?.[0]?.snippet;
      if (snippet && snippet.description) {
        // Truncate the description to 300 characters if it's too long.
        return snippet.description.length > 300
          ? snippet.description.substring(0, 300) + "..."
          : snippet.description;
      }
      return "none found";
    } catch (error) {
      console.error("YouTube Fetch Error:", error);
      return "Error fetching YouTube summary";
    }
  }

  // useEffect runs whenever the query state changes.
  // It triggers the data fetching functions and updates the results.
  useEffect(() => {
    async function fetchData() {
      if (!query.trim()) {
        // Clear results if the query is empty.
        setRedditResult('');
        setYoutubeResult('');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const reddit = await fetchRedditSummary(query);
        const youtube = await fetchYouTubeSummary(query);

        setRedditResult(reddit);
        setYoutubeResult(youtube);
      } catch (err) {
        setError("There was an issue fetching data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query]);

  // The App component renders the Home component, passing along
  // the current query, the function to update it, and the results.
  return (

    <HashRouter>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </HashRouter>

    
  );
}

export default App;
