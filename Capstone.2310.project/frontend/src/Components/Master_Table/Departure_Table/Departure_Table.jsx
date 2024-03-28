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
        <table className="flightsTable">
            <thead>
                <tr>
                    <th>Departure_Table</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {/* Example row */}
                <tr>
                    <td>320</td>
                    <td>ISB-DXB<br />18-09-20 01:15pm</td>
                    <td>18-09-20 03:15pm</td>
                    <td>02:00</td>
                </tr>
                <tr className="bookRow">
                    <td colSpan="4">
                        <div className="bookButtonContainer">
                            <span className="priceText">Total Price: $1500</span>
                            <button className="bookButton" onClick={onBookClick}>Departure_Table</button>
                        </div>
                    </td>
                </tr>
                {/* Add more rows as needed */}
            </tbody>
        </table>
    );
};

export default Departure_Table;
