import { useState, useEffect } from 'react';
import './Searchbar.css';

function Searchbar({ setQuery }) {
    const [input, changeInput] = useState("");
    const [key, getPressed] = useState("");

    const handleInputChange = (event) => {
        changeInput(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (input.trim()) {
            setQuery(input);
        }
    };

    return (
        <>
            <form className="topnav" onSubmit={onSubmit}> 
                <a className="active" href="#home">Home</a>
                <a className="active" href="#about">About</a>
                <input type="text" placeholder="Search.." onChange={handleInputChange}></input>
            </form>
        </>
    );
}

export default Searchbar;