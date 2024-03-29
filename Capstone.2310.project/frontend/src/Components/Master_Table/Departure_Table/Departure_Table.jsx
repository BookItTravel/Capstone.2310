import React, { useState } from 'react';
import './Departure_Table.css';

const Departure_Table = ({ onBookClick }) => {
    const [flight, setFlight] = useState([]);
    const [input, setInput] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);

    const fetchData = (value) => {
        fetch(`http://localhost:3000/city-and-airport-search/${input}`)
            .then((response) => response.json())
            .then((json) => {
                const result = json;
                console.log(result);
            });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    const handleRowClick = (index) => {
        setSelectedRow(selectedRow === index ? null : index);
        onBookClick();
    };

    return (
        <>
            <div className='table-container'>
                <h2 className='table-header'>Departing Flights</h2>
                <table className="results-table">
                    <thead>
                        <tr>
                            <th className='table-heading'>Airline</th>
                            <th className='table-heading'>Departure</th>
                            <th className='table-heading'>Arrival</th>
                            <th className='table-heading'>Duration</th>
                            <th className='table-heading'>Price</th>
                        </tr>
                    </thead>
                    <tbody className='table-body'>
                    <tr
                            className={selectedRow === 0 ? 'table-row selected' : 'table-row'} // Apply 'selected' class if the row is selected
                            onClick={() => handleRowClick(0)} // Pass index or identifier of the row
                        >
                            <td className='table-info'>
                                <p className='table-text'>United</p>
                            </td>
                            <td className='table-info'>
                                <p className='table-text'>18-09-20 01:15pm</p> {/* Additional time under ISB-DXB */}
                                <p className='table-text'>Seattle</p>
                            </td>
                            <td className='table-info'>
                                <p className='table-text'>18-09-20 03:15pm</p> {/* Original time placement */}
                                <p className='table-text'>New York City</p>
                            </td>
                            <td className='table-info'><p className='table-text'>02:00</p></td>
                            <td className= 'table-info'><p className='table-text'>$1,500</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Departure_Table;
