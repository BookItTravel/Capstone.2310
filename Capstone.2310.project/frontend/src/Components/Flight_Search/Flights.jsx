import React, { useState } from 'react';
import "./Flight.css";
import { FaSearch } from 'react-icons/fa';

const Flights = () => {
    const [adults, setAdults] = useState(1);
    const [departureDate, setDepartureDate] = useState('');
    const [cityOr, setCityOr ] = useState('')
    const [cityDes, setCityDes ] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
     
        try {
            const responseOrigin = await fetch(`http://localhost:3000/api/search/${cityOr}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                },
            });
            if (!responseOrigin.ok) {
                throw new Error('Unsuccessful');
            }
            const resDataOrigin = await responseOrigin.json();
            console.log("data", resDataOrigin);

            const cityOriginNames = resDataOrigin.data.map(location => location.address.cityName);
            console.log("City Names", cityOriginNames);

            const responseDes = await fetch(`http://localhost:3000/api/search/${cityDes}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                },
            });
            if (!responseDes.ok) {
                throw new Error('Unsuccessful');
            }
            const resDes = await responseDes.json();
            console.log("data", resDes);

            const cityDesNames = resDes.data.map(location => location.address.cityName);
            console.log("City Names", cityDesNames);


            const params = {
                         cityDesNames,
                       cityOriginNames,
                         departureDate: departureDate,
                         adults: adults
                   };

            const responseTwo = await fetch(`http://localhost:3000/flight-search`, {params}, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
            //   body: JSON.stringify(params) 
           
            });
            if (!responseTwo.ok) {
                throw new Error('Unsuccessful');
            }
            const responseData = await responseTwo.json();
            console.log("data", responseData);

         
        } catch (error){
            console.error("Error getting your data", error);
        }
    };
   
    
    return ( 


        <div className='flight-search'>
        <h1>Flight Search</h1>
        <form onSubmit={handleSubmit}>
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
                    value={cityOr}
                    onChange={(e) => setCityOr(e.target.value)}
                    />
            </div>
            <div className="input-wrapper">
                <FaSearch id="search-icon" /> 
                <input 
                    placeholder='Destination'
                    value={cityDes}
                    onChange={(e) => setCityDes(e.target.value)}
                    />
            </div>
            <button type="submit">Search</button>
        </form>
    </div>
    )
}

export default Flights;