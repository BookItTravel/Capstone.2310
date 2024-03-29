import { useState } from 'react';
import './Hotel_Table.css';

const Hotel_Table = ({ onRowClick }) => {
    const [hotel, setHotel] = useState([]);
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
        onRowClick();
    };

    return (
        <>
            <div className='table-container'>
                <h2 className='table-header'>Hotels</h2>
                <table className="results-table">
                    <thead>
                        <tr>
                            <th className='table-heading'>Hotel</th>
                            <th className='table-heading'>Location</th>
                            <th className='table-heading'>Check-In Date</th>
                            <th className='table-heading'>Check-Out Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr
                            className={selectedRow === 0 ? 'table-row selected' : 'table-row'} // Apply 'selected' class if the row is selected
                            onClick={() => handleRowClick(0)} // Pass index or identifier of the row
                        >
                            <td className='hotel-table-info'>
                                <p className='table-text'>Hilton</p>
                            </td>
                            <td className='hotel-table-info'>
                                <p className='table-text'>Brookly, NY</p>
                            </td>
                            <td className='hotel-table-info'>
                                <p className='table-text'>4-11-2024</p>
                            </td>
                            <td className='hotel-table-info'><p className='table-text'>4-14-2024</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Hotel_Table;
