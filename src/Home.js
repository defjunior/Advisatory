import React, { useState, useEffect } from 'react';
import Searchbar from "./Searchbar";

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
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=5&key=${apiKey}`; // Increased maxResults to 5

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
                <h1>Results from YouTube and Reddit for: {query}</h1>
                
                <select value={selectedResult} onChange={handleSelectChange}>
                    <option value="">Select a platform</option>
                    <option value="Reddit">Reddit</option>
                    <option value="YouTube">YouTube</option>
                </select>

                <div>
                    {selectedResult && (
                        <h2>{selectedResult} Results:</h2>
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