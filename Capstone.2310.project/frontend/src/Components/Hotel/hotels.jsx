import React from 'react'
import { useEffect, useState } from 'react'
import { FaSearch} from "react-icons/fa"
import './hotels.css'




const Hotels = ({cityCode, departureDate}) => {
    const [input, setInput] = useState('');
    const [hotelIds, setHotelIds] = useState([]);
    //const [cityCode, setCityCode] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [adults, setAdults] = useState('');
    const [hotelName, setHotelName] = useState([])
  
    const fetchHotels = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:3000/city-hotels?cityCode=${cityCode}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if(!response.ok) {
          throw new Error ('Unsucessful');
        }
        const resData = await response.json();
        console.log("data", resData);
        
        const hotelIdss = resData.data.map(hotel => hotel.hotelId);
        const nameHotel = resData.data.map(name => name.name);
        console.log("hotelIds", hotelIdss);
        console.log("Hotel Name:", nameHotel)
        setHotelIds(hotelIdss);
        setHotelName(nameHotel);
        
        const params = {
          hotelIds,
          cityCode,
          checkInDate: departureDate,
          checkOutDate,
          adults
        };
    
        const responseHotelOffer = await fetch(`http://localhost:3000/api/hotels`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        });
        if (!responseHotelOffer.ok) {
          throw new Error('Unsuccessful');
        }
        const resHotel = await responseHotelOffer.json();
        console.log("Hotels Offer:",resHotel)
      } catch (error){
        console.error("error ", error);
      }
    }
      
      // const param = {
        //   hotelIds: hotelIds,
        //   cityCode: cityCode,
        //   checkInDate: checkInDate,
        //   checkOutDate: checkOutDate,
        //   adults: adults
        // };


  // fetch(`http://localhost:3000/api/hotels`,  {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(param)
  // })
  // .then((response) => {
  //   console.log("Response", response);
  //   return response.json();
  // })
  // .then((data) => {
  //   console.log(data);
  // })
  // .catch((error) => {
  //   console.error("Error fetching hotels:", error);
  // });




    return ( 
      <>  
   <div className='hotel-search'>
  <form onSubmit={fetchHotels}>
    <div className="input-wrapper">
      <FaSearch id="search-icon" /> 
       <input 
        placeholder={cityCode}
       // value={cityCode}
        //onChange={(e) => setCityCode(e.target.value)}
      />
    </div>
    <button type="submit">Show me where to stay</button>
  </form>


  <h1>{cityCode}</h1>
  <h1>{departureDate}</h1>
  <h1>Hotels:</h1>
  <table>
    <thead>
      <tr>
        <th>Hotel ID</th>
        <th>Hotel Name</th>
      </tr>
    </thead>
    <tbody>
  {hotelIds.slice(0, 10).map((hotelId, index) => (
    <tr key={index}>
      <td>{hotelId}</td>
      <td>{hotelName[index]}</td>
    </tr>
  ))}
</tbody>
  </table>
</div>
  </>
 
 )
} 

export default Hotels


{/* <div className='hotel-search'>
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
</div> */}