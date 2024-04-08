import { Link, useNavigate } from 'react-router-dom';
import "./Booking.css";
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const { flightDeparture, flightReturn, hotelOffers, cityDesName, cityOriginName, adult } = location.state;

  console.log("booking prop departure", flightDeparture);
  console.log("booking prop return", flightReturn);
  console.log("Data hotel Offer Card in booking", hotelOffers);
  console.log("Data desName in booking", cityDesName[0].cityCode);
  console.log("Data originName in booking", cityOriginName.cityCode);
  console.log("adults in booking", adult)


  const navigate = useNavigate();
  const handleBookingDetail = () => {
      navigate('/bookingdetails', {state: { adult }})
  }
  
  const cityCodeOrigin = cityOriginName?.[0]?.cityCode;
  const cityCodeDestination = cityDesName?.[0]?.cityCode;
  const fetchData = (value) => {
    fetch (`http://localhost:3000/city-and-airport-search/${cityCodeOrigin}`)
    .then((response) => response.json())
    .then((json) => {
     const result = json
        console.log("airport destination result", result);

    });
  };
  fetchData();

    const flightTotal = flightDeparture.travelerPricings[0].price.total >= flightReturn.travelerPricings[0].price.total
    ? flightDeparture.travelerPricings[0].price.total
    : flightReturn.travelerPricings[0].price.total;
  

  const totalFlightCost = parseFloat(flightTotal);
  const totalHotelCost = parseFloat(hotelOffers.data[0].offers[0].price.total);
  const totalBeforeSavings = totalFlightCost + totalHotelCost;
  const totalAfterSavings = totalBeforeSavings - 320;


  const convertDuration = (durationString) => {
    const matches = durationString.match(/PT(\d+)H(\d+)M/);
    if(!matches) return "Invalid duration";

    const hours = parseInt(matches[1]);
    const minutes = parseInt(matches[2]);

    const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2,'0')}`;

    return formattedDuration;
  }

  const durationDeparture = flightDeparture.itineraries[0].duration;
  const convertedDuration = convertDuration(durationDeparture)


  const durationReturn = flightReturn.itineraries[0].duration;
  const convertedDurationReturn = convertDuration(durationReturn);

  const convertDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();

    return `${date} ${time}`;
  } 

  const dateTimeString = flightDeparture.itineraries[0].segments[0].departure.at;
  const formattedDateTimeDestinationDepart = convertDateTime(dateTimeString);

  const dateTimeStringArrivalDepart = flightDeparture.itineraries[0].segments[0].arrival.at;
  const formattedDateTimeDestinationArrival = convertDateTime(dateTimeStringArrivalDepart);

  const dateTimeStringReturn = flightReturn.itineraries[0].segments[0].departure.at;
  const formattedDateTimeReturn = convertDateTime(dateTimeString);

  const dateTimeStringReturnArrival = flightReturn.itineraries[0].segments[0].departure.at;
  const formattedDateTimeReturnDepart = convertDateTime(dateTimeStringReturn);

  const dateTimeStringArrivalReturn = flightReturn.itineraries[0].segments[0].arrival.at;
  const formattedDateTimeReturnArrival = convertDateTime(dateTimeStringArrivalReturn);

 
  return (
    <div>
      <div className="booking-container">
        <div className="review-container">
          <div className="booking-title-container">
        {/* <h1 className="review-heading">Review your trip</h1> */}
          </div>
          <div className="custom-booking-container">
            <div className="flight-card">
              <div className="column-heading">
                <h3 className="column-title">Flights</h3>
              </div>
            
              <div className="trip-card">
                <div className="flight-container">
                <h4 className="flight-summary">{cityOriginName.cityName} to {cityDesName[0].cityName}</h4>
                  <p>Airline: {flightDeparture.itineraries[0].segments[0].carrierCode}</p>
                  <p>Aircraft: {flightDeparture.itineraries[0].segments[0].aircraft.code}</p>
                  <p>Duration: {convertedDuration}</p>
                  <p>Cabin: {flightDeparture.travelerPricings[0].fareDetailsBySegment[0].cabin}</p>
                  <p className="flight-name"> {cityOriginName.cityName}</p>
                  <p>Seattle-Tacoma International Airport</p>
                  <p>Departure: {formattedDateTimeDestinationDepart} </p>
                  <p className="flight-name" >{cityDesName[0].cityName}</p>
                  <p>John F. Kennedy International Airport</p>
                  <p>Arrival: {formattedDateTimeDestinationArrival}</p>
                </div>


                <div className="flight-container">
                  <h4 className="flight-summary">
                  {cityDesName[0].cityName} to {cityOriginName.cityName}
                  </h4>
                  <p>Airline: {flightReturn.itineraries[0].segments[0].carrierCode}</p>
                  <p>Aircraft: {flightReturn.itineraries[0].segments[0].aircraft.code}</p>
                  <p>Duration: {convertedDuration}</p>
                  <p>Cabin: {flightReturn.travelerPricings[0].fareDetailsBySegment[0].cabin}</p>
                  <p className="flight-name"> {cityOriginName.cityName}</p>
                  <p>Seattle-Tacoma International Airport</p>
                  <p>Departure: {formattedDateTimeReturnDepart} </p>
                  <p className="flight-name" >{cityDesName[0].cityName}</p>
                  <p>John F. Kennedy International Airport</p>
                  <p>Arrival: {formattedDateTimeReturnArrival}</p>
                </div>
              </div>
              <div className="button-container">
                <button className="booking-button">Change Flight</button>
              </div>
            </div>
            <div className="hotel-card">
              <div className="column-heading">
                <h3 className="column-title">Stay</h3>
              </div>
              <div className="hotel-container">
                <p className="hotel-name">{hotelOffers.data[0].hotel.name}</p>
                <p>{hotelOffers.data[0].hotel.cityCode}</p>
                <p>Check In: {hotelOffers.data[0].offers[0].checkInDate}</p>
                <p>Check Out: {hotelOffers.data[0].offers[0].checkOutDate}</p>
              </div>
              <div className="button-container">
                <button className="booking-button">Change Stay</button>
              </div>
            </div>
            <div className="cost-container">
              <div className="cost-title-container">
                <h3 className="cost-heading">Cost Details</h3>
              </div>
              <div className="cost-detail-container">
                  <p>Order Date: {flightDeparture.lastTicketingDate}</p>
                <table className="cost-table">
                  <tbody className="cost-table-body">
                    <tr className="cost-table-row">
                      <td className="item-data">Flights</td>
                      <td className="cost-data">
  {flightDeparture.travelerPricings[0].price.total >= flightReturn.travelerPricings[0].price.total
    ? `$${flightDeparture.travelerPricings[0].price.total}`
    : `$${flightReturn.travelerPricings[0].price.total}`}
</td>
                    </tr>
                    <tr className="cost-table-row">
                      <td className="item-data">Stay</td>
                      <td className="cost-data">${hotelOffers.data[0].offers[0].price.total}</td>
                    </tr>
                    <tr className="cost-table-row">
                      <td className="item-data">Savings</td>
                      <td className="savings-data">-$320</td>
                    </tr>
                    <tr className="cost-table-row">
                      <td className="total-name">Total</td>
                      <td className="total-data">   ${totalAfterSavings.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="button-container">
                <button  className="booking-button" onClick={handleBookingDetail} >Booking Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
