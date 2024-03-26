import React from 'react'
import { useEffect, useState } from 'react'
import { FaSearch} from "react-icons/fa"
import './hotels.css'




const Hotels = () => {
    const [input, setInput] = useState('');
    const [hotelIds, setHotelIds] = useState('');
    const [cityCode, setCityCode] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [adults, setAdults] = useState('');
  
const fetchHotels = (e) => {
  e.preventDefault();

  const param = {
    hotelIds: hotelIds,
    cityCode: cityCode,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    adults: adults
  };

  fetch(`http://localhost:3000/api/hotels`,  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(param)
  })
  .then((response) => {
    console.log("Response", response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching hotels:", error);
  });

}
   


    return ( 
      <>  
       <div className='hotel-search'>
      <h1>Hotel Search</h1>
      <form onSubmit={fetchHotels}>
          <div className="input-wrapper">
              <FaSearch id="search-icon" /> 
              <input 
                  placeholder='Hotel ID'
                  value={hotelIds}
                  onChange={(e) => setHotelIds(e.target.value)}
              />
          </div>
          <div className="input-wrapper">
              <FaSearch id="search-icon" /> 
              <input 
                  placeholder='City'
                  value={cityCode}
                  onChange={(e) => setCityCode(e.target.value)}
              />
          </div>
          <div className="input-wrapper">
              <FaSearch id="search-icon" /> 
              <input 
                  placeholder='Check In Date'
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
              />
          </div>
          <div className="input-wrapper">
              <FaSearch id="search-icon" /> 
              <input 
                  placeholder='Check Out Date'
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
              />
          </div>
          <div className="input-wrapper">
              <FaSearch id="search-icon" /> 
              <input 
                  placeholder='Number of Adults'
                  type="number"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
              />
          </div>
          <button type="submit">Search</button>
      </form>
  </div>
  </>
 
    )
} 

export default Hotels

