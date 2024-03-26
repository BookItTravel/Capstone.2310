import { useEffect } from 'react'
import './main.css'
import img from '../../assets/img.jpg'
import img2 from '../../assets/img2.jpg'
import img3 from '../../assets/img3.jpg'
import img4 from '../../assets/img4.jpg'
import img5 from '../../assets/img5.jpg'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import Aos from 'aos'
import 'aos/dist/aos.css'


function Main() {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])



    const Data = [
        {
            id: 1,
            imgSrc: img,
            destTitle: 'Bora Bora',
            location: 'Tahiti',
            grade: 'Starting at',
            fees: '$1,700',
            description: 'Bora Bora, a small South Pacific island in French Polynesia, is renowned for its turquoise lagoon, luxurious overwater bungalows, vibrant marine life, and tranquil beauty.'

        },

        {
            id: 2,
            imgSrc: img2,
            destTitle: 'Machu Picchu',
            location: 'Peru',
            grade: 'Starting at',
            fees: '$1,600',
            description: 'Machu Picchu, the iconic Incan citadel set high in the Andes Mountains of Peru, showcases remarkable ancient engineering and breathtaking natural surroundings.'

        },

        {
            id: 3,
            imgSrc: img3,
            destTitle: 'Cancun',
            location: 'Mexico',
            grade: 'Starting at',
            fees: '$1,000',
            description: "Cancun, a vibrant city on Mexico's Yucatan Peninsula, is renowned for its stunning Caribbean beaches, lively nightlife, rich Mayan heritage, and luxurious resorts."

        },

        {
            id: 4,
            imgSrc: img4,
            destTitle: 'Santorini ',
            location: 'Greece',
            grade: 'Starting at',
            fees: '$1,900',
            description: 'Santorini, a Greek island in the Aegean Sea, is famed for its dramatic views, stunning sunsets, white-washed buildings, blue-domed churches, and ancient archaeological sites.'

        },

        {
            id: 5,
            imgSrc: img5,
            destTitle: 'Tokyo',
            location: 'Japan',
            grade: 'Starting at',
            fees: '$2,500',
            description: "Tokyo, Japan's bustling capital, blends ultra-modern and traditional, from neon-lit skyscrapers and anime shops to historic temples, serene parks, and rich culinary scenes."
        },
    ]

    return (
        <section className='main container section wide-container'>


            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Most visited destinations
                </h3>
            </div>

            <div className="secContent grid">
                {
                    Data.map(({ id, imgSrc, destTitle, location, grade, fees, description }) => {
                        return (
                            <div key={id}
                                data-aos="fade-up" className="singleDestination">

                                <div className="imageDiv">
                                    <img src={imgSrc} alt={destTitle} />
                                </div>

                                <div className="cardInfo">
                                    <h4 className="destTitle">
                                        {destTitle}
                                    </h4>
                                    <span className="continent flex">
                                        <HiOutlineLocationMarker className='icon' />
                                        <span className="name">{location}</span>
                                    </span>

                                    <div className="fees flex">
                                        <div className="grade">
                                            <span>{grade}</span>
                                        </div>
                                        <div className="price">
                                            <h5>{fees}</h5>
                                        </div>
                                    </div>

                                    <div className="desc">
                                        <p>{description}</p>
                                    </div>

                                    <button className='btn flex'>
                                        DETAILS <HiOutlineClipboardCheck className="icon" />
                                    </button>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Main