/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './Search.css';


const Search = ({setFlightData, setDepartDate, setReturnsDate, setDestinationCode, setOriginCode, setAdult, setReturnLocation, setCityOriginName, setCityDesName }) => {
    const navigate = useNavigate();
    const [adults, setAdults] = useState(1);
    const [departureDate, setDepartureDate] = useState('');
    const [originLocationCode, setOriginLocationCode ] = useState('');
    const [destinationLocationCode, setDestinationLocationCode ] = useState('');
    const [returnDate, setReturnDate ] = useState('');



    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
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
            const cityOrigin = resDataOrigin.data.map((location )=> location.address.cityName);
            console.log("City Origin Names", cityOriginNames);
            console.log("City Origin cityNames", cityOrigin);

            setCityOriginName(cityOriginNames);
          

        
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
            const cityDesCode = resDes.data.map((location )=> location.address.cityCode);
            const cityDes = resDes.data.map((location )=> location.address.cityName);
            console.log("City Destination code", destinationCode)
            console.log("City Des Names", cityDesNames);
            console.log("City Des Code", cityDesCode);
            console.log("City DesName Code", cityDes);
            setCityDesName(cityDesNames)




             console.log(" cities ",cityDesNames, cityOriginNames)
            const params = {
                originLocationCode: cityOriginNames.cityCode,
                destinationLocationCode: destinationCode.cityCode ,
                         departureDate: departureDate,
                         adults: adults
                   };
                   setAdult(adults);
                   setDepartDate(departureDate);
                   setDestinationCode(destinationCode.cityCode);
                   setOriginCode( cityOriginNames.cityCode);
                   setReturnsDate(returnDate)
                   setReturnLocation(destinationCode.cityCode)
             console.log("Params", params)
            const responseTwo = await fetch(`http://localhost:3000/flight-search`,  {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
              body: JSON.stringify(params) 
           
            });
            if (!responseTwo.ok) {
                throw new Error('Unsuccessful');
            }
            const responseData = await responseTwo.json();
          
            console.log("data", responseData);
            setFlightData(responseData);

            navigate('/bookingdetails', { numberofTravelers: adults });
        } catch (error){
            console.error("Error getting your data", error);
        }
        navigate('/master_table');
    };

    const handleAdultsChange = (newValue) => {
        const newAdults = newValue < 1? 1 : newValue;
        setAdults(newAdults);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='searchForm'>
                <div className="destinationInput">
                    <label htmlFor="city" className='searchLabel'>Flying From</label>
                    <div className="searchInput-container">
                        <input type="text" placeholder='Originial location...'
                            value={originLocationCode}
                            onChange={(e) => setOriginLocationCode(e.target.value)} className='searchInput' />
                        <GrLocation className="searchIcon" />
                    </div>
                </div>

                <div className="destinationInput">
                    <label htmlFor="city" className='searchLabel'>Flying To</label>
                    <div className="searchInput-container">
                        <input type="text" placeholder='Enter destination...' 
                            value={destinationLocationCode}
                            onChange={(e) => setDestinationLocationCode(e.target.value)} className='searchInput' />
                        <GrLocation className="searchIcon" />
                    </div>
                </div>

                <div className="dateInput">
                    <label htmlFor="date" className='searchLabel'>Departure Date</label>
                    <div className="searchInput-container">
                        <input type="date" 
                        value={departureDate}
                        min={new Date().toISOString().split('T')[0]} // Set minimum date to today's date
                        onChange={(e) => setDepartureDate(e.target.value)} className='searchInput' />
                    </div>
                </div>

                <div className="dateInput">
                    <label htmlFor="date" className='searchLabel'>Return Date</label>
                    <div className="searchInput-container">
                        <input type="date"
                          value={returnDate}
                         min={new Date().toISOString().split('T')[0]} // Set minimum date to today's date
                         onChange={(e) => setReturnDate(e.target.value)} className='searchInput' />
                    </div>
                </div>

                <div className="travelerInput">
                    <label htmlFor="travelers" className='searchLabel'>Number of Travelers</label>
                    <div className="searchInput-container">
                        <input type="number" 
                        value={adults}
                        onChange={(e) => handleAdultsChange(parseInt(e.target.value))} className='searchInput' />
                    </div> 
                </div>
                <div className='searchButton-container'>
                    <button type="submit" 
                    className='searchButton'>Search</button>
                </div>
            </form>
           
        </div>
    )
};

export default Search;