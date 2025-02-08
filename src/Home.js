import React, { useState, useEffect } from 'react';
import Searchbar from "./Searchbar";

function Home() {
    const [redditResult, setRedditResult] = useState('loading...');
    const [youtubeResult, setYoutubeResult] = useState('loading...');
    const [query, setQuery] = useState("how to deal with a long day at work");
    const [selectedResult, setSelectedResult] = useState(''); // New state for selected result

    async function fetchRedditTopResult(query) {
        const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=relevance&limit=1`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.data.children[0]?.data?.title || "none found";
        } catch (error) {
            return "error for reddit results";
        }
    }

    async function fetchYouTubeTopResult(query) {
        const apiKey = 'AIzaSyBzTP6xG7xc2JeTRwuh_VeFbux8BDwCc1A'; // Replace with your actual API key
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=1&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.items?.[0]?.snippet?.title || "none found";
        } catch (error) {
            return "error for youtube results";
        }
    }

    useEffect(() => {
        async function fetchData() {
            const reddit = await fetchRedditTopResult(query);
            const youtube = await fetchYouTubeTopResult(query);
            setRedditResult(reddit);
            setYoutubeResult(youtube);
        }

        fetchData();
    }, [query]);

    // Handle the selection from the dropdown
    const handleSelectChange = (e) => {
        setSelectedResult(e.target.value);
    };

    return (
        <>
            <Searchbar setQuery={setQuery} />
            <div className="main">
                <h1>Results from YouTube and Reddit for: {query}</h1>
                <select value={selectedResult} onChange={handleSelectChange}>
                    <option value="">Select a result</option>
                    <option value={`Reddit: ${redditResult}`}>Reddit: {redditResult}</option>
                    <option value={`YouTube: ${youtubeResult}`}>YouTube: {youtubeResult}</option>
                </select>
                <h2>Selected Result: {selectedResult}</h2>
            </div>
        </>
    );
}

export default Home;