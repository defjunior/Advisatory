
import Searchbar from "./Searchbar";
import { useState, useEffect } from 'react';

function Home() {
    const [redditResult, setRedditResult] = useState('loading...');
    const [youtubeResult, setYoutubeResult] = useState('loading...');
    const query = 'how to deal with a long day at work'; // query to search
    
  
    async function fetchRedditTopResult(query) { 
      // async means can run w/o stopping other code (kinda like coroutine i think)
      
      // api request, takes in query
      const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=relevance&limit=1`;
  
      try {
        // fetches data from reddit
        const response = await fetch(url);
        const data = await response.json();
  
        // return title of first result OR no results found
        return data.data.children[0]?.data?.title || "none found";
      } catch (error) {
        return "error for reddit results";
      }
    }
  
    async function fetchYouTubeTopResult(query) {
      const apiKey = 'AIzaSyBzTP6xG7xc2JeTRwuh_VeFbux8BDwCc1A';
  
      // make the yt api url w/ query arg
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=1&key=${apiKey}`;
  
      try {
        // data from yt
        const response = await fetch(url);
        const data = await response.json();
  
        // same as prev
        return data.items?.[0]?.snippet?.title || "none found";
      } catch (error) {
        return "error for youTube results";
      }
    }
  
    // useffect runs the functions when component (App) "mounts", mounts meaning react renders, added to DOM
    useEffect(() => {
      async function fetchData() {
        const reddit = await fetchRedditTopResult(query);
        const youtube = await fetchYouTubeTopResult(query);
        
        // set state so it updates in UI
        setRedditResult(reddit);
        setYoutubeResult(youtube);
      }
  
      fetchData();
    }, [query]); // runs when 'query' changes (only once in this case)
  
  return (
    <>
      <Searchbar />
    <div className = "main">
      <h1>results from youtube and reddit, for: {query}</h1>
      <h2>Reddit: {redditResult}</h2>
      <h2>YouTube: {youtubeResult}</h2>
    </div>
    </>
  
  )
   


}

export default Home