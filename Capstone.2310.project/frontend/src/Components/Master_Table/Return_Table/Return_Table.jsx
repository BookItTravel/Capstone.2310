import React, { useState, useEffect } from 'react';
import './Return_Table.css';

const Return_Table = ({ onBookClick, adult, departDate, destinationCode, originCode, returnsDate, setSelectedFlightReturn }) => {
    const [returns, setReturns] = useState([]);
    const [input, setInput] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [adults, setAdults] = useState(1);
    const [departureDate, setDepartureDate] = useState('');
    const [originLocationCode, setOriginLocationCode] = useState('');
    const [destinationLocationCode, setDestinationLocationCode] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [returnFlightData, setReturnFlightData] = useState([]);

    useEffect(() => {
    const fetchData = async () => { 
       
        const params = {
           adults: adult,
           originLocationCode: destinationCode,
            destinationLocationCode: originCode,
           departureDate: returnsDate,
           
        }
    
        try {
        const response = await fetch(`http://localhost:3000/flight-search`,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
             body: JSON.stringify(params) 
          
           });
           if (!response.ok) {
               throw new Error('Unsuccessful');
           }
           const resData = await response.json();
           setReturnFlightData(resData.data || []);
           
        } catch (error){
            console.error("Error getting your data", error);
        }

        fetchData();
    }, []);
    const handleRowClick = (index, returns) => {
        setSelectedRow(selectedRow === index ? null : index);
        setSelectedFlightReturn(returns)
        onBookClick();
    };

    return (
        <>
            <div className='table-container'>
                <h2 className='table-header'>Returning Flights</h2>
                <div className="table-wrapper">
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
                      {returnFlightData && returnFlightData && returnFlightData.length > 0 && returnFlightData.map((returns, index) => (
                          <tr
                              key={index}
                              className={selectedRow === index ? 'table-row selected' : 'table-row'} // Apply 'selected' class if the row is selected
                              onClick={() => handleRowClick(index, returns)} // Pass index or identifier of the row
                          >
                              <td className='table-info'>
                                  {returns.itineraries[0].segments[0].carrierCode}
                              </td>
                              <td className='table-info'>
                                  {returns.itineraries[0].segments[0].departure.at}<br />
                                  {returns.itineraries[0].segments[0].departure.iataCode}
                              </td>
                              <td className='table-info'>
                                  {returns.itineraries[0].segments[0].arrival.at}<br />
                                  {returns.itineraries[0].segments[0].arrival.iataCode}
                              </td>
                              <td className='table-info'>
                                  {returns.itineraries[0].duration}
                              </td>
                              <td className='table-info'>
                                  {returns.price.total}
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

export default Return_Table;
