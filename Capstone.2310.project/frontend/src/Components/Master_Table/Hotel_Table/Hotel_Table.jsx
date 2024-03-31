import { useState,useEffect } from 'react';
import './Hotel_Table.css';

const Hotel_Table = ({ onRowClick,cityCode, departureDate }) => {
    const [hotel, setHotel] = useState([]);
    const [input, setInput] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [hotelIds, setHotelIds] = useState([]);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [adults, setAdults] = useState('');
    const [hotelName, setHotelName] = useState([])

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

    const fetchHotels = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/city-hotels?cityCode=${cityCode}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if(!response.ok) {
                throw new Error ('Unsucessful');
            }
            const resData = await response.json();
            console.log("data", resData);
            
            const hotelIdss = resData.data.map(hotel => hotel.hotelId);
            const nameHotel = resData.data.map(name => name.name);
            console.log("hotelIds", hotelIdss);
            console.log("Hotel Name:", nameHotel)
            setHotelIds(hotelIdss);
            setHotelName(nameHotel);
            
            const params = {
                hotelIds,
                cityCode,
                checkInDate: departureDate,
                checkOutDate,
                adults
            };
            
            const responseHotelOffer = await fetch(`http://localhost:3000/api/hotels`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });
            if (!responseHotelOffer.ok) {
                throw new Error('Unsuccessful');
            }
            const resHotel = await responseHotelOffer.json();
            console.log("Hotels Offer:", resHotel)
        } catch (error){
            console.error("error ", error);
        }
    }
    
    
    
    const handleRowClick = (index) => {
        setSelectedRow(selectedRow === index ? null : index);
        onRowClick();
        fetchHotels();
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
                                <p className='table-text'>Brooklyn, NY</p>
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
