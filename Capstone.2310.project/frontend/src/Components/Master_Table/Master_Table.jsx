/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Departure_Table from "../Master_Table/Departure_Table/Departure_Table";
import Return_Table from "../Master_Table/Return_Table/Return_Table";
import Hotel_Table from "../Master_Table/Hotel_Table/Hotel_Table";
import Search from "../../Components/Search/Search";
import HotelOffer from "../HotelOffer/HotelOffer";
import "./Master_Table.css";

const Master_Table = ({ setFlightDataDeparture, setFlightDataReturn }) => {
  const [showDepartureTable, setShowDepartureTable] = useState(false);
  const [showReturnTable, setShowReturnTable] = useState(false);
  const [showHotelTable, setShowHotelTable] = useState(false);
  const [showHotelOffer, setShowHotelOffer] = useState(false);
  const [flightData, setFlightData] = useState([]);
  const [adult, setAdult] = useState(1);
  const [departDate, setDepartDate] = useState("");
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [returnsDate, setReturnsDate] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [selectedHotelName, setSelectedHotelName] = useState("");
  const [selectedFlightDeparture, setSelectedFlightDeparture] = useState([]);
  const [selectedFlightReturn, setSelectedFlightReturn] = useState([]);
  const [isBookingClicked, setIsBookingClicked] = useState(false);
  const [cityOriginName, setCityOriginName] = useState("");
  const [cityDesName, setCityDesName] = useState("");

  const handleShowDepartureTable = () => {
    setShowDepartureTable(true);
  };

  const handleBookDeparture = () => {
    setShowReturnTable(true);
    setFlightDataDeparture(selectedFlightDeparture);
  };

  const handleBookReturn = () => {
    setShowHotelTable(true);
    setFlightDataReturn(selectedFlightReturn);
  };

  const handleShowHotelOffer = () => {
    setShowHotelOffer(true);
  };

  const handleCloseHotelOffer = () => {
    setShowHotelOffer(false);
  };

  const handleBookHotelOffer = () => {
    setIsBookingClicked(true);
  };

  return (
    <div className="masterTable-container">
      <div className="search-container">
        <Search
          handleShowDepartureTable={handleShowDepartureTable}
          setFlightData={setFlightData}
          setAdult={setAdult}
          setDepartDate={setDepartDate}
          setDestinationCode={setDestinationCode}
          setOriginCode={setOriginCode}
          setReturnsDate={setReturnsDate}
          setReturnLocation={setReturnLocation}
          setCityOriginName={setCityOriginName}
          setCityDesName={setCityDesName}
        />
      </div>
      <div className="secondDiv">
        {showDepartureTable && (
          <Departure_Table
            onBookClick={handleBookDeparture}
            flightData={flightData}
            setSelectedFlightDeparture={setSelectedFlightDeparture}
          />
        )}
        {showReturnTable && (
          <Return_Table
            onBookClick={handleBookReturn}
            adult={adult}
            departDate={departDate}
            destinationCode={destinationCode}
            originCode={originCode}
            returnsDate={returnsDate}
            returnLocation={returnLocation}
            setSelectedFlightReturn={setSelectedFlightReturn}
          />
        )}
        {showHotelTable && (
          <Hotel_Table
            destinationCode={destinationCode}
            originCode={originCode}
            departDate={departDate}
            returnsDate={returnsDate}
            setSelectedHotelId={setSelectedHotelId}
            setSelectedHotelName={setSelectedHotelName}
            onRowClick={handleShowHotelOffer}
          />
        )}
      </div>
      {showHotelOffer && (
        <HotelOffer
          departDate={departDate}
          returnsDate={returnsDate}
          adult={adult}
          destinationCode={destinationCode}
          selectedHotelId={selectedHotelId}
          selectedHotelName={selectedHotelName}
          onClose={handleCloseHotelOffer}
          selectedFlightDeparture={selectedFlightDeparture}
          selectedFlightReturn={selectedFlightReturn}
          originCode={originCode}
          cityDesName={cityDesName}
          cityOriginName={cityOriginName}
        />
      )}
    </div>
  );
};

export default Master_Table;
