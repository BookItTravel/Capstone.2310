import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import flightsapi from '../../api/flightsapi';

import { FaSearch } from 'react-icons/fa';




   const Airport = (props) => {
    const [airport, setAirport] = useState([]);
    const [error, setError] = useState();
    const [input, setInput] = useState('')

   
        const fetchData = (value) => {
                fetch (`http://localhost:3000/city-and-airport-search/${input}`)
                .then((response) => response.json())
                .then((json) => {
                 const result = json
                    console.log(result);
      
                });
        };
        



    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }
    

    return (
        <div className="flight">
            <p>hello</p>

            <div className='search-container'>
            <FaSearch id="search-icon" 
        
            /> 
            <input 
            placeholder='Search for airports'
            value={input}
            onChange={(e) => handleChange(e.target.value)}
         /> 
            </div>
            <table className='flight-table'>
                <thead></thead>
                <tbody>
               
                    {airport.map((flights, index) => (
                        <tr key={index}>
                            <td>{flights.address.cityName}</td>
                            <td>{flights.address.cityName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> 
    );
};

export default Airport;

