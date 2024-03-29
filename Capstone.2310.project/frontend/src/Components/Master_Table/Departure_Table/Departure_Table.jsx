import React, { useState } from 'react';
import './Departure_Table.css';

const Departure_Table = ({ onBookClick }) => {
    // const [flight, setFlight] = useState([]);
    // const [input, setInput] = useState('');

    // const fetchData = (value) => {
    //     fetch(`http://localhost:3000/city-and-airport-search/${input}`)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             const result = json;
    //             console.log(result);
    //         });
    // };

    // const handleChange = (value) => {
    //     setInput(value);
    //     fetchData(value);
    // };

    return (
        <>
            {/* <h1 data-aos="fade-up" className="homeTitle">
                        Search Your Holiday
                    </h1> */}
            <div className='departingFlightsDiv'>
                <table className="flightsTable">
                    <thead>
                        <tr>
                            <th className="departingFlightsHeader" colSpan="4">
                                Departing Flights
                            </th>
                        </tr>
                        <tr>
                            <th className='table-heading'>Airline</th>
                            <th className='table-heading'>Departure</th>
                            <th className='table-heading'>Arrival</th>
                            <th className='table-heading'>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='table-row'>
                            <td className='table-info'>
                                <p>United</p>
                            </td>
                            <td className='table-info'>
                                <p>18-09-20 01:15pm</p> {/* Additional time under ISB-DXB */}
                                <p>Seattle</p>
                            </td>
                            <td className='table-info'>
                                <p>18-09-20 03:15pm</p> {/* Original time placement */}
                                <p>New York City</p>
                            </td>
                            <td className='table-info'><p>02:00</p></td>
                        </tr>
                        {/* <tr className="bookRow">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <div className="bookButtonContainer">
                                    <span className="priceText">Total Price: $1500</span>
                                    <button className="bookButton" onClick={onBookClick}>Book It</button>
                                </div>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Departure_Table;
