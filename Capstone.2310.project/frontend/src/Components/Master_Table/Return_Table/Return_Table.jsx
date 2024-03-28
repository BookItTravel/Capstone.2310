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
        <table className="flightsTable">
            <thead>
                <tr>
                    <th>Airline</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {/* Flight rows */}
                <tr className="bookRow">
                    <td colSpan="4">
                        <div>
                            <span className="priceText">Total Price: $1500</span>
                            <button className="bookButton" onClick={onBookClick}>Return_Table</button>
                        </div>
                    </td>
                </tr>
                {/* Repeat for each flight as needed */}
            </tbody>
        </table>
    );
};

export default Return_Table;
