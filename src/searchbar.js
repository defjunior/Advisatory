

import React from 'react';

function Searchbar({ query, setQuery }) {
  return (
    <div className="topnav">
      <a className="active" href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for something..."
        id="searchBar"
      />
    </div>
  );
}

export default Searchbar;

