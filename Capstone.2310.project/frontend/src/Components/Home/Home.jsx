import { useEffect } from 'react'
import './home.css'
import video from '../../assets/video.mp4'
import { GrLocation } from 'react-icons/gr'
import { FiFacebook } from 'react-icons/fi'
import { AiOutlineInstagram } from 'react-icons/ai'
import { SiTripadvisor } from 'react-icons/si'
import { BsListTask } from 'react-icons/bs'
import { TbApps } from 'react-icons/tb'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useState } from 'react';
import axios from 'axios'


function Home() {
    const [destinationLocationCode, setDestinationLocationCode] = useState('')
    const [adults, setAdults] = useState(1);
    const [departureDate, setDepartureDate] = useState('');
    const [originLocationCode, setOriginLocationCode] = useState('');
    //const [returnDate, setReturnDate] = useState('')

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    
  const fetchFlights = (value) => {
    fetch(`http://localhost:3000/flight-search`)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
    });
  }

   const handleChange = (destinationLocationCode, adults, departureDate, originLocationCode) => {
        setAdults(adults)
        setDepartureDate(departureDate)
        setDestinationLocationCode(destinationLocationCode)
        setOriginLocationCode(originLocationCode)
   }


    return (
        <section className="home">
            <div className="overlay"></div>
            <video src={video} muted autoPlay loop type="video/mp4"></video>
            
            <div className="homeContent container">
                <div className="textDiv">


                    <span data-aos="fade-up" className='smallText'>
                        Our Packages
                    </span>
                    <h1 data-aos="fade-up" className="homeTitle">
                        Search Your Holiday
                    </h1>
                </div>

                <div data-aos="fade-up" className="cardDiv grid">
                    
                    <form onSubmit={handleChange}>
                    <div className="destinationInput">
                        <label htmlFor="city">Flying From</label>
                        <div className="input flex">
                            <input type="text" placeholder='Enter name here...'
                              value={originLocationCode}
                              onChange={(e) => setOriginLocationCode(e.target.value)}
                             />
                            <GrLocation className="icon" />
                        </div>
                    </div>

                    <div className="destinationInput">
                        <label htmlFor="city">Flying To</label>
                        <div className="input flex">
                            <input type="text" placeholder='Enter name here...'
                               value={destinationLocationCode}
                               onChange={(e) => setDestinationLocationCode(e.target.value)} />
                            <GrLocation className="icon" />
                        </div>
                    </div>

                    <div className="dateInput">
                        <label htmlFor="date">Departure Date</label>
                        <div className="input flex">
                            <input type="date" value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}/>
                        </div>
                    </div>

                    <div className="dateInput">
                        <label htmlFor="date">Run Date</label>
                        <div className="input flex">
                            <input type="date" />
                             {/* value={returnDate}
                             onChange={(e) => setReturnDate(e.target.value)} /> */}
                        </div>
                    </div>

                    <div className="travelerinput">
                        <label htmlFor="travelers">Number of Travelers</label>
                        <div className="input flex">
                            <input type="number" value={adults}  
                            onChange={(e) => setAdults(e.target.value)}/>
                        </div>
                    </div>

                    <div className="searchOptions flex">

                        <button>Search Flights</button>

                    </div>
                </form>
                </div>

                <div data-aos="fade-up"
                    className="homeFooterIcons flex">
                    <div className="rightIcons">
                        <FiFacebook className="icon" />
                        <AiOutlineInstagram className="icon" />
                        <SiTripadvisor className="icon" />
                    </div>
                    <div className="leftIcons">
                        <BsListTask className="icon" />
                        <TbApps className="icon" />

                    </div>
                </div>
            </div>


        </section>
    )
}

export default Home