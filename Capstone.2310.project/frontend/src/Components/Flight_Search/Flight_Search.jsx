
import '../Flight_Search/Flight_Search.css'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { RiAccountPinCircleLine } from 'react-icons/ri'
import { RiCalendar2Fill } from "react-icons/ri";
import { useState } from 'react';
import axios from 'axios'



function Flight_Search() {
 const [destinationLocationCode, setDestinationLocationCode] = useState('')
 const [adults, setAdults] = useState(1);
 const [departureDate, setDepartureDate] = useState('');
 const [originLocationCode, setOriginLocationCode] = useState('');

 
 // const handleSubmit = async (e) => {
     //     e.preventDefault()
     //   const data = {
         //     destinationLocation,adults, departureDate, originLocation
         //   }
         //     const result = await axios.post('http://localhost:3000/flight-search', {data})
         //     console.log(result.data)
         //  const handleChange = (value) => {
           
         //     setDepartureDate(departureDate)
         //     setOriginLocation(originLocation)
         //     setDestinationLocation(destinationLocation)
         //     setTravelers(travelers)
         //     fetchData(value);
          
         //  };
         //     console.log("orgin", originLocation)
         // } 

             const handleSubmit = async (parameters) => {
                 try {
                     const url = 'http://localhost:3000/flight-search';
                     const response = await axios.post(url, parameters);
                     if (response.status === 200) {
                         // Return the data received from the server
                         return response.data;
                        } else {
                            // Handle other status codes if needed
                            console.error('Request failed with status:', response.status);
                            return null;
                        }
                    } catch (error) {
                        // Handle any errors that occur during the request
                        console.error('Error fetching data:', error);
                        return null;
                    }
                }
                // Example usage:
                const parameters = {
                    // Add your parameters here
                    departureDate: departureDate,
                    destinationLocationCode: destinationLocationCode,
                    originLocationCode: originLocationCode,
                    adults:adults
                    
                    
                };
                handleSubmit(parameters)
                .then(data => {
                    if (data) {
                        console.log('Data received from the server:', data);
                        // Process the received data here
                    } else {
                        console.log('Failed to fetch data from the server.');
                    }
                })
                .catch(error => {
                    console.error('An error occurred:', error);
                });
       
            
            const handleChange = (parameters) => {
        setAdults(adults)
        setDepartureDate(departureDate)
        setDestinationLocationCode(destinationLocationCode)
        setOriginLocationCode(originLocationCode)
        handleSubmit(parameters)
        }
            
            
    return (
        <div className="search container section">
            <div className="sectionContainer grid">
            <form onSubmit={handleChange}>
                <div className="btns flex">
                    <div className="singlBtn">
                        <span>Economy</span>
                    </div>

                    <div className="singlBtn">
                        <span>Business Class</span>
                    </div>

                    <div className="singlBtn">
                        <span>First Class</span>
                    </div>
                </div>

                <div className="searchInputs flex">
                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <HiOutlineLocationMarker className="icon" />
                        </div>
                        <div className="texts">
                            <h4>Origin Location</h4>
                            <input type="text" placeholder='Where do you want to go?' 
                            value={originLocationCode}
                            onChange={(e) => setOriginLocationCode(e.target.value)}
                          
                            />
                        </div>

                    </div>
                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <HiOutlineLocationMarker className="icon" />
                        </div>
                        <div className="texts">
                            <h4>Destination</h4>
                            <input type="text" placeholder='Where do you want to go?' 
                            value={destinationLocationCode}
                            onChange={(e) => setDestinationLocationCode(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <RiAccountPinCircleLine className="icon" />
                        </div>
                        <div className="texts">
                            <h4>Travelers</h4>
                            <input type="text" placeholder='Add guests' value={adults}  
                            onChange={(e) => setAdults(e.target.value)}/>
                        </div>

                    </div>

                    <div className="singleInput flex">
                        {/* <div className="iconDiv">
                            <RiCalendar2Fill className="icon" />
                        </div>
                        <div className="texts">
                            <h4>Check In</h4>
                            <input type="date" placeholder='Add date' />
                        </div> */}

                    </div>

                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <RiCalendar2Fill className="icon" />
                        </div>
                        <div className="texts">
                            <h4>Depature Date</h4>
                            <input type="date" 
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}

                            placeholder='Add date' />
                        </div>

                        <button type="submit" className="btn btnBlock flex">Search Flight</button>

                    </div>


                </div>
                </form>
            </div>
        </div>
    )
}




export default Flight_Search