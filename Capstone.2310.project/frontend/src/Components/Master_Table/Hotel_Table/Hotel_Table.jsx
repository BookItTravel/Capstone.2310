import { useState,useEffect } from 'react';
import './Hotel_Table.css';

const Hotel_Table = ({ onRowClick, destinationCode, departDate, returnsDate, originCode }) => {
    const [hotel, setHotel] = useState([]);
    const [input, setInput] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [hotelIds, setHotelIds] = useState([]);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [adults, setAdults] = useState('');
    const [hotelName, setHotelName] = useState([])
    const [cityCode, setCityCode] = useState('');
   
 

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
    useEffect(() => {
        const fetchHotels = async () => {
            setCityCode(destinationCode);
            try {
                const response = await fetch(`http://localhost:3000/city-hotels?cityCode=${cityCode}`, {
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
                    const nameHotel = resData.data.map(name => name.name);
    
                    setHotelIds(hotelIdss);
                    setHotelName(nameHotel);
    
                    const params = {
                        hotelIds,
                        cityCode,
                        checkInDate: departDate,
                        checkOutDate: returnsDate,
                        adults
                    };
    
                    console.log("dates checkin", departDate)
                    console.log("dates checkout", returnsDate)
                } else {
                    console.log('No hotel data found.');
                }
            } catch (error) {
                console.error("error ", error);
            }
        }
    
        fetchHotels();
    }, [destinationCode, departDate, returnsDate, adults]); 
    
    const handleHotel = (value) => {

        setHotel(value);
    }
    console.log("kjajkj", hotel)
    
    const handleRowClick = (index) => {
        setSelectedRow(selectedRow === index ? null : index);
        onRowClick();
        fetchHotels();
    };
    
    
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
                    <tr     key={index}
                            className={selectedRow === 0 ? 'table-row selected' : 'table-row'} // Apply 'selected' class if the row is selected
                            onClick={() => handleRowClick(0)} // Pass index or identifier of the row
                        >
                            <td className='hotel-table-info'>
                                <p onClick={handleHotel} value={hotelId} className='table-text'>{hotelName[index]}</p>
                            </td>
                            <td className='hotel-table-info'>
                                <p className='table-text'>{destinationCode}</p>
                            </td>
                            <td className='hotel-table-info'>
                                <p className='table-text'>{departDate}</p>
                            </td>
                            <td className='hotel-table-info'><p className='table-text'>{returnsDate}</p></td>
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
