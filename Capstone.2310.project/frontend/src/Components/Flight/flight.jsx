import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import flightsapi from '../../api/flightsapi';
import './flight.css'
import { FaSearch } from 'react-icons/fa';
// import { FlightContext, FlightContextProvider } from '../../context/FlightContext';



   const Flights = (props) => {
    const [flight, setFlight] = useState([]);
    const [error, setError] = useState();
    const [input, setInput] = useState('')
    // const { flights, setFlights } = useContext(FlightContext);
   
        const fetchData = (value) => {
                fetch (`http://localhost:3000/city-and-airport-search/${input}`)
                .then((response) => response.json())
                .then((json) => {
                 const result = json
                    console.log(result);
                //setFlight(response.data.data);
                });
        };
        



    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }
    
    //console.log(response.data.data)
    return (
        <div className="flight">
            <p>hello</p>

            <div className='search-container'>
            <FaSearch id="search-icon" 
        
            /> 
            <input 
            placeholder='Search for flights'
            value={input}
            onChange={(e) => handleChange(e.target.value)}
         /> 
            </div>
            <table className='flight-table'>
                <thead></thead>
                <tbody>
               
                    {flight.map((flights, index) => (
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

export default Flights;

