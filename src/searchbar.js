import { useState, useEffect } from 'react';
import './Searchbar.css';

function Searchbar() {



    return (

        <>
    
        <div class="topnav">
            <a class="active" href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <input type="text" placeholder="Search.."></input>
        </div> 
    
        </>
    )
}
export default Searchbar