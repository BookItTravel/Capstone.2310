/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "./Search.css";
import { fetchOriginLocation, fetchDestinationLocation, fetchFlightData } from "./api";

const Search = ({
  setFlightData,
  setDepartDate,
  setReturnsDate,
  setDestinationCode,
  setOriginCode,
  setAdult,
  setReturnLocation,
  setCityOriginName,
  setCityDesName,
  handleShowDepartureTable,
}) => {
  const navigate = useNavigate();
  const [adults, setAdults] = useState(1);
  const [departureDate, setDepartureDate] = useState("");
  const [originLocationCode, setOriginLocationCode] = useState("");
  const [destinationLocationCode, setDestinationLocationCode] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cityOriginNames = await fetchOriginLocation(originLocationCode);
      setCityOriginName(cityOriginNames);

      const destinationCode = await fetchDestinationLocation(destinationLocationCode);
      setCityDesName(destinationCode.map(location => location.address));

      const params = {
        originLocationCode: cityOriginNames.cityCode,
        destinationLocationCode: destinationCode.cityCode,
        departureDate: departureDate,
        adults: adults,
      };

      setAdult(adults);
      setDepartDate(departureDate);
      setDestinationCode(destinationCode.cityCode);
      setOriginCode(cityOriginNames.cityCode);
      setReturnsDate(returnDate);
      setReturnLocation(destinationCode.cityCode);

      const responseData = await fetchFlightData(params);

      setFlightData(responseData);
      handleShowDepartureTable();

      navigate("/bookingdetails", { numberofTravelers: adults });
    } catch (error) {
      console.error("Error getting your data", error);
    }
    navigate("/master_table");
  };

  const handleAdultsChange = (newValue) => {
    const newAdults = newValue < 1 ? 1 : newValue;
    setAdults(newAdults);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="searchForm">
        <div className="destinationInput">
          <label htmlFor="city" className="searchLabel">
            Flying From
          </label>
          <div className="searchInput-container">
            <input
              type="text"
              placeholder="Originial location..."
              value={originLocationCode}
              onChange={(e) => setOriginLocationCode(e.target.value)}
              className="searchInput"
            />
            <GrLocation className="searchIcon" />
          </div>
        </div>

        <div className="destinationInput">
          <label htmlFor="city" className="searchLabel">
            Flying To
          </label>
          <div className="searchInput-container">
            <input
              type="text"
              placeholder="Enter destination..."
              value={destinationLocationCode}
              onChange={(e) => setDestinationLocationCode(e.target.value)}
              className="searchInput"
            />
            <GrLocation className="searchIcon" />
          </div>
        </div>

        <div className="dateInput">
          <label htmlFor="date" className="searchLabel">
            Departure Date
          </label>
          <div className="searchInput-container">
            <input
              type="date"
              value={departureDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="searchInput"
            />
          </div>
        </div>

        <div className="dateInput">
          <label htmlFor="date" className="searchLabel">
            Return Date
          </label>
          <div className="searchInput-container">
            <input
              type="date"
              value={returnDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setReturnDate(e.target.value)}
              className="searchInput"
            />
          </div>
        </div>

        <div className="travelerInput">
          <label htmlFor="travelers" className="searchLabel">
            Number of Travelers
          </label>
          <div className="searchInput-container">
            <input
              type="number"
              value={adults}
              onChange={(e) => handleAdultsChange(parseInt(e.target.value))}
              className="searchInput"
            />
          </div>
        </div>
        <div className="searchButton-container">
          <button type="submit" className="searchButton">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
