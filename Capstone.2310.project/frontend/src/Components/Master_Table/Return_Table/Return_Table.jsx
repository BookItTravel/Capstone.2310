import React, { useState } from 'react';
import './Return_Table.css';

const Return_Table = ({ onBookClick }) => {
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

            <table className="flightsTable">
                <thead>
                    <tr>
                        <th className="returningFlightsHeader" colSpan="4">
                            Returning Flights
                        </th>
                    </tr>
                    <tr>
                        <th>Airline</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div>320</div>
                        </td>
                        <td>
                            <div>18-09-20 01:15pm</div> {/* Additional time under ISB-DXB */}
                        </td>
                        <td>
                            18-09-20 03:15pm {/* Original time placement */}
                        </td>
                        <td>02:00</td>
                    </tr>
                    <tr className="bookRow">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <div className="bookButtonContainer">
                                <span className="priceText">Total Price: $1500</span>
                                <button className="bookButton" onClick={onBookClick}>Book It</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Return_Table;
