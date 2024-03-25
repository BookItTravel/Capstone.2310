import React, { useState } from 'react';
import "./Flight.css";
import { FaSearch } from 'react-icons/fa';

const Flights = () => {
    const [destinationLocationCode, setDestinationLocationCode] = useState('');
    const [adults, setAdults] = useState(1);
    const [departureDate, setDepartureDate] = useState('');
    const [originLocationCode, setOriginLocationCode] = useState('');

    const fetchFlights = (e) => {
        e.preventDefault();

        const params = {
            departureDate: departureDate,
            destinationLocationCode: destinationLocationCode,
            originLocationCode: originLocationCode,
            adults: adults
        };

      
        fetch(`http://localhost:3000/flight-search`,{params}, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
           
        })
        .then((response) => {
            console.log("Response:", response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
          
        })
        .catch((error) => {
            console.error('Error fetching flights:', error);
            
        });
    }

    return ( 
        <div className='flight-search'>
            <h1>Flight Search</h1>
            <form onSubmit={fetchFlights}>
                <div className="input-wrapper">
                    <FaSearch id="search-icon" /> 
                    <input 
                        placeholder='Number of Adults'
                        type="number"
                        value={adults}
                        onChange={(e) => setAdults(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <FaSearch id="search-icon" /> 
                    <input 
                        placeholder='Departure Date'
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <FaSearch id="search-icon" /> 
                    <input 
                        placeholder='Origin Location'
                        value={originLocationCode}
                        onChange={(e) => setOriginLocationCode(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <FaSearch id="search-icon" /> 
                    <input 
                        placeholder='Destination'
                        value={destinationLocationCode}
                        onChange={(e) => setDestinationLocationCode(e.target.value)}
                    />
                </div>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default Flights;