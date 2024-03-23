import React from 'react'
import { useEffect, useState } from 'react'
import { FaSearch} from "react-icons/fa"




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
        <>
        <h1>Hotel Search</h1>
        <div className="input-wrapper"></div>
        <FaSearch id="search-icon" /> 
        <input 
        placeholder='where to?'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        />
        </>
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