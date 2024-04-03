import React, { useState } from 'react';
import "./Flight.css";
import { FaSearch } from 'react-icons/fa';

const Flights = () => {
    const [adults, setAdults] = useState(1);
    const [departureDate, setDepartureDate] = useState('');
    const [originLocationCode, setOriginLocationCode ] = useState('')
    const [destinationLocationCode, setDestinationLocationCode ] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
     
        try {
            
            const responseOrigin = await fetch(`http://localhost:3000/api/search/${originLocationCode}`, {
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

            const cityOriginNames = resDataOrigin.data.reduce((obj,cur  )=>{
                if(cur.address){
                    return { ...cur.address}
                }
            },{})
            console.log("City Names", cityOriginNames);

        
            const responseDes = await fetch(`http://localhost:3000/api/search/${destinationLocationCode}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                },
            });
            if (!responseDes.ok) {
                throw new Error('Unsuccessful');
            }
            const resDes = await responseDes.json();
            const destinationCode =  resDes.data.reduce((obj,cur) => {
                 if(cur.address) {
                    return { ...cur.address}
                 }

       
            },{})
            
            const cityDesNames = resDes.data.map((location )=> location.address);
            const cityDsNames = resDes.data.map((location )=> location.address.cityCode);
            console.log("City Names", cityDesNames);
            console.log("City NamesCode", cityDsNames);



             console.log(" citiesth",cityDesNames, cityOriginNames)
            const params = {
                originLocationCode: cityOriginNames.cityCode,
                destinationLocationCode: destinationCode.cityCode,
                         departureDate: departureDate,
                         adults: adults
                   };
                   console.log("Params", params)
                   const responseTwo = await fetch(`http://localhost:3000/flight-search`,  {
                       method: 'POST',
                       headers: {
                           'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(params) 
                        
                    });
                    console.log("hotelss",destinationCode.cityCode)
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
                  placeholder='Number of Adults'
                     type="number"
                    value={adults}
                   onChange={(e) => setAdults(e.target.value)}
                    />
             </div>
                     <button type="submit">Search</button>
         </form>
     </div>
    //         <div className="input-wrapper">
    //             <FaSearch id="search-icon" /> 
    //             <input 
    //                 placeholder='Destination'
    //                 value={destinationLocationCode}
    //                 onChange={(e) => setDestinationLocationCode(e.target.value)}
    //                 />
    //         </div>
    //         <div className="input-wrapper">
    //             <FaSearch id="search-icon" /> 
    //             <input 
    //                 placeholder='Departure Date'
    //                 type="date"
    //                 value={departureDate}
    //                 onChange={(e) => setDepartureDate(e.target.value)}
    //                 />
    //         </div>
    //         <div className="input-wrapper">
    //             <FaSearch id="search-icon" /> 
    //             <input 
    //                 placeholder='Number of Adults'
    //                 type="number"
    //                 value={adults}
    //                 onChange={(e) => setAdults(e.target.value)}
    //                 />
    //         </div>
    //         <button type="submit">Search</button>
    //     </form>
    // </div>
    )
}

export default Flights;