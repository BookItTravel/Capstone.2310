import React, { useEffect } from 'react'
import './main.scss'
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
            grade: 'Relax',
            fees: '$700',
            description: 'Nestled in the heart of South America, Peru is a captivating destination that weaves together a rich tapestry of culture, history, and natural beauty. '

        },

        {
            id: 2,
            imgSrc: img2,
            destTitle: 'Machu Picchu',
            location: 'Peru',
            grade: 'Relax',
            fees: '$600',
            description: 'Nestled in the heart of South America, Peru is a captivating destination that weaves together a rich tapestry of culture, history, and natural beauty. '

        },

        {
            id: 3,
            imgSrc: img3,
            destTitle: 'Cancun',
            location: 'Mexico',
            grade: 'Relax',
            fees: '$700',
            description: "Nestled along the turquoise shores of the Caribbean Sea, Cancun stands as an unrivaled jewel on Mexico's Yucatán Peninsula. "

        },

        {
            id: 4,
            imgSrc: img4,
            destTitle: 'Santorini ',
            location: 'Greece',
            grade: 'Relax',
            fees: '$700',
            description: "Santorini boasts some of the world's most breathtaking sunsets, transforming the sky into a palette of warm hues that reflect upon the shimmering waters. "

        },

        {
            id: 5,
            imgSrc: img5,
            destTitle: 'Tokyo',
            location: 'Japan',
            grade: 'Relax',
            fees: '$700',
            description: 'Embark on a journey to Tokyo, a city that seamlessly blends ancient traditions with cutting-edge innovation, creating a captivating tapestry of culture, cuisine, and technology. '
        },
    ]

    return (
        <section className='main container section'>


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
                                            <span>{grade}<small></small></span>
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