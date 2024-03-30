import React, { useState } from 'react';
import Departure_Table from '../Master_Table/Departure_Table/Departure_Table'
import Return_Table from '../Master_Table/Return_Table/Return_Table'
import Hotel_Table from '../Master_Table/Hotel_Table/Hotel_Table'
import Search from '../../Components/Search/Search'
import './Master_Table.css'




function Master_Table() {
    const [showReturnTable, setShowReturnTable] = useState(false);
    const [showHotelTable, setShowHotelTable] = useState(false);

    // Handler for showing Return Table
    const handleBookDeparture = () => {
        setShowReturnTable(true);
    };

    // Handler for showing Hotel Table
    const handleBookReturn = () => {
        setShowHotelTable(true);
    };

    return (
        <div className='masterTable-container'>
            <Search />
            <div className='secondDiv'>
                <Departure_Table onBookClick={handleBookDeparture} />
                {showReturnTable && <Return_Table onBookClick={handleBookReturn} />}
                {showHotelTable && <Hotel_Table />}
            </div>
        </div>

    );
}

export default Master_Table;