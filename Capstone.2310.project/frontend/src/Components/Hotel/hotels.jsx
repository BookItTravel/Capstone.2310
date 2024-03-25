import React from 'react'
import { useEffect, useState } from 'react'
import { FaSearch} from "react-icons/fa"
import './hotels.css'




const Hotels = () => {
    const [input, setInput] = useState('');
 
    const fetchHotels = (value) => {
        // fetch(`http://localhost:3000/api/hotels`)
        fetch(`http://localhost:3000/city-hotels`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        });
    }

  const handleChange = (value) => {
    setInput(value);
    fetchHotels(value);
  }


    return (
        <div  className='hotel-search' >
        <h1>Hotel Search</h1>
        <div className="input-wrapper">

        <FaSearch id="search-icon" /> 
        <input 
        placeholder='Where to stay?'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        />
        </div>
        </div>
    )
} 

export default Hotels

// const Hotels = () => {
//     const [input, setInput] = useState('');
 
//     const fetchHotels = (value) => {
//         fetch(`http://localhost:3000/api/hotels`)
//         .then((response) => response.json())
//         .then((json) => {
//             console.log(json);
//         });
//     }

//   const handleChange = (value) => {
//     setInput(value);
//     fetchHotels(value);
//   }


//     return (
//         <>
//         <h1>Hotel Search</h1>
//         <div className="input-wrapper"></div>
//         <FaSearch id="search-icon" /> 
//         <input 
//         placeholder='where to?'
//         value={input}
//         onChange={(e) => handleChange(e.target.value)}
//         />
//         </>
//     )
// } 