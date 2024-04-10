import { useState, useEffect } from 'react';
import './Hotel_Table.css';

 const Hotel_Table = ({ onRowClick, destinationCode, departDate, returnsDate, originCode, setSelectedHotelId, setSelectedHotelName }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [hotelIds, setHotelIds] = useState([]);
    const [hotelName, setHotelName] = useState([]);
 
    const handleRowClick = (index, hotelId, name) => {
        setSelectedRow(index);
        setSelectedHotelId(hotelId);
        setSelectedHotelName(name)
        onRowClick();
    };

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch(`http://localhost:3000/city-hotels?cityCode=${destinationCode}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Unsuccessful');
                }

                const resData = await response.json();
                console.log("eedata", resData);

                if (resData.data && resData.data.length > 0) {
                    const hotelIdss = resData.data.map(hotel => hotel.hotelId);
                    const nameHotel = resData.data.map(names => names.name);

                    setHotelIds(hotelIdss);
                    setHotelName(nameHotel);
                }
            } catch (error) {
                console.error("error ", error);
            }
        }

        fetchHotels();
    }, [destinationCode]);
    return (
        <>
            <div className='table-container'>
                <h2 className='table-header'>Hotels</h2>
                <div className="table-wrapper">
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
                            {hotelIds.slice(0, 10).map((hotelId, index) => (
                                <tr
                                    key={index}
                                    className={selectedRow === index ? 'table-row selected' : 'table-row'}
                                    onClick={() => handleRowClick(index, hotelId, hotelName[index])}
                                >
                                    <td className='hotel-table-info'>
                                        {hotelName[index]}
                                    </td>
                                    <td className='hotel-table-info'>
                                        {destinationCode}
                                    </td>
                                    <td className='hotel-table-info'>
                                        {departDate}
                                    </td>
                                    <td className='hotel-table-info'>
                                        {returnsDate}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Hotel_Table;