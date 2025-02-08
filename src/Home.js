import React from 'react';
import Searchbar from "./Searchbar";

function Home({ query, setQuery, redditResult, youtubeResult, loading, error }) {
  return (
    <>
      {/* Render the Searchbar */}
      <Searchbar query={query} setQuery={setQuery} />
      
      {/* Render results and messages */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && (
        <>
          <h1>Results from YouTube and Reddit, for: "{query}"</h1>
          <h2>Reddit: {redditResult}</h2>
          <h2>YouTube: {youtubeResult}</h2>
        </>
      )}
    </>
  );
}

export default Home;


}

export default Home
