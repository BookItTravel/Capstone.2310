// import { useEffect, useState } from 'react'
import './home.css'
import video from '../../assets/video.mp4'
// import { GrLocation } from 'react-icons/gr'
import { FiFacebook } from 'react-icons/fi'
import { AiOutlineInstagram } from 'react-icons/ai'
import { SiTripadvisor } from 'react-icons/si'
import { BsListTask } from 'react-icons/bs'
import { TbApps } from 'react-icons/tb'
// import Aos from 'aos'
import 'aos/dist/aos.css'
import Search from '../Search/Search';


function Home() {
   // const [flightData, setFlightData] = useState([])
    // const [adults, setAdults] = useState(1);
    // const [departureDate, setDepartureDate] = useState('');
    // const [originLocationCode, setOriginLocationCode ] = useState('')
    // const [destinationLocationCode, setDestinationLocationCode ] = useState('')

    // useEffect(() => {
    //     Aos.init({ duration: 2000 })
    // }, [])
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {

    //         const responseOrigin = await fetch(`http://localhost:3000/api/search/${originLocationCode}`, {
    //             method: 'GET',
    //             headers: {
    //                 "Content-Type": 'application/json'
    //             },
    //         });
    //         if (!responseOrigin.ok) {
    //             throw new Error('Unsuccessful');
    //         }
    //         const resDataOrigin = await responseOrigin.json();
    //         console.log("data", resDataOrigin);

    //         const cityOriginNames = resDataOrigin.data.reduce((obj,cur  )=>{
    //             if(cur.address){
    //                 return { ...cur.address}
    //             }
    //         },{})
    //         console.log("City Names", cityOriginNames);


    //         const responseDes = await fetch(`http://localhost:3000/api/search/${destinationLocationCode}`, {
    //             method: 'GET',
    //             headers: {
    //                 "Content-Type": 'application/json'
    //             },
    //         });
    //         if (!responseDes.ok) {
    //             throw new Error('Unsuccessful');
    //         }
    //         const resDes = await responseDes.json();
    //         const destinationCode =  resDes.data.reduce((obj,cur) => {
    //              if(cur.address) {
    //                 return { ...cur.address}
    //              }


    //         },{})

    //         const cityDesNames = resDes.data.map((location )=> location.address);
    //         console.log("City Names", cityDesNames);



    //          console.log(" cities ",cityDesNames, cityOriginNames)
    //         const params = {
    //             originLocationCode: cityOriginNames.cityCode,
    //             destinationLocationCode: destinationCode.cityCode ,
    //                      departureDate: departureDate,
    //                      adults: adults
    //                };
    //          console.log("Params", params)
    //         const responseTwo = await fetch(`http://localhost:3000/flight-search`,  {
    //          method: 'POST',
    //          headers: {
    //              'Content-Type': 'application/json'
    //          },
    //           body: JSON.stringify(params) 

    //         });
    //         if (!responseTwo.ok) {
    //             throw new Error('Unsuccessful');
    //         }
    //         const responseData = await responseTwo.json();
    //         console.log("data", responseData);


    //     } catch (error){
    //         console.error("Error getting your data", error);
    //     }
    // };

    // const handleSearchClick = () => {
    //     navigate('/master_table'); // Path to navigate to Master_Table
    // };

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

                {/* <div data-aos="fade-up" className="formDiv">  */}
                <Search />
                {/* <form onSubmit={handleSubmit} className='cardDiv grid'>
                        <div className="destinationInput">
                            <label htmlFor="city" className='searchLabel'>Flying From</label>
                            <div className="input flex">
                                <input type="text" placeholder='Originial location...'
                                    value={originLocationCode}
                                    onChange={(e) => setOriginLocationCode(e.target.value)} />
                                <GrLocation className="icon" />
                            </div>
                        </div>

                        <div className="destinationInput">
                            <label htmlFor="city" className='searchLabel'>Flying To</label>
                            <div className="input flex">
                                <input type="text" placeholder='Enter destination...' 
                                    value={destinationLocationCode}
                                    onChange={(e) => setDestinationLocationCode(e.target.value)}/>
                                <GrLocation className="icon" />
                            </div>
                        </div>

                        <div className="dateInput">
                            <label htmlFor="date" className='searchLabel'>Departure Date</label>
                            <div className="input flex">
                                <input type="date" 
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}/>
                            </div>
                        </div>

                        <div className="dateInput">
                            <label htmlFor="date" className='searchLabel'>Return Date</label>
                            <div className="input flex">
                                <input type="date" />
                            </div>
                        </div>

                        <div className="travelerinput">
                            <label htmlFor="travelers" className='searchLabel'>Number of Travelers</label>
                            <div className="input flex">
                                <input type="number" 
                                value={adults}
                                onChange={(e) => setAdults(e.target.value)}/>
                            </div> 
                        </div>
                        <button type="submit" className='searchButton'>Search Flights</button>
                    </form> */}
                {/* </div> */}

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