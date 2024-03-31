import { useState } from 'react';
import Departure_Table from '../Master_Table/Departure_Table/Departure_Table'
import Return_Table from '../Master_Table/Return_Table/Return_Table'
import Hotel_Table from '../Master_Table/Hotel_Table/Hotel_Table'
import Search from '../../Components/Search/Search'
import HotelOffer from '../HotelOffer/HotelOffer';
import './Master_Table.css'

const Master_Table = () => {
    const [showReturnTable, setShowReturnTable] = useState(false);
    const [showHotelTable, setShowHotelTable] = useState(false);
    const [showHotelOffer, setShowHotelOffer] = useState(false);
    const [flightData, setFlightData] = useState([]);
    const [adult, setAdult] = useState(1);
    const [departDate, setDepartDate] = useState('');
    const [originCode, setOriginCode ] = useState('');
    const [destinationCode, setDestinationCode ] = useState('');
    const [returnsDate, setReturnsDate ] = useState('');
    // Handler for showing Return Table
    const handleBookDeparture = () => {
        setShowReturnTable(true);
    };

    // Handler for showing Hotel Table
    const handleBookReturn = () => {
        setShowHotelTable(true);
    };

    // Handler for showing Hotel Offer
    const handleShowHotelOffer = () => {
        setShowHotelOffer(true);
    };

    // Handler for closing Hotel Offer
    const handleCloseHotelOffer = () => {
        setShowHotelOffer(false);
        };

    return (
        <div className='masterTable-container'>
            <div className='search-container'>
                <Search 
                setFlightData={setFlightData}
                setAdult={setAdult}
                setDepartDate={setDepartDate}
                setDestinationCode={setDestinationCode}
                setOriginCode={setOriginCode}
                setReturnsDate={setReturnsDate}
                 />
            </div>
            <div className='secondDiv'>
                <Departure_Table onBookClick={handleBookDeparture} flightData={flightData}/>
                {showReturnTable && <Return_Table 
                onBookClick={handleBookReturn}
                adult={adult}
                departDate={departDate}
                destinationCode={destinationCode}
                originCode={originCode}
                returnsDate={returnsDate}
                
                 />}
                {showHotelTable && <Hotel_Table onRowClick={handleShowHotelOffer} />}
            </div>
            {showHotelOffer && 
                <HotelOffer 
                    onClose={handleCloseHotelOffer}
                />
            }
        </div>

    );
};

export default Master_Table;