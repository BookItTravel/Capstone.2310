import { Link } from 'react-router-dom';
import "./Booking.css";
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const { flightDeparture, flightReturn, hotelOffers, cityDesName, cityOriginName } = location.state;


    console.log("booking prop departure", flightDeparture);
    console.log("booking prop return", flightReturn);
    console.log("Data hotel Offer Card in booking", hotelOffers);
    console.log("Data desName in booking", cityDesName);
    console.log("Data originName in booking", cityOriginName);
 
  return (
    <div>
      <div className="booking-container">
        <div className="review-container">
          <div className="booking-title-container">
        <h1 className="review-heading">Review your trip</h1>
          </div>
          <div className="custom-booking-container">
            <div className="flight-card">
              <div className="column-heading">
                <h3 className="column-title">Flights</h3>
              </div>
            
              <div className="trip-card">
                <div className="flight-container">
                <h4 className="flight-summary">{cityOriginName.cityName} to {cityDesName[0].cityName}</h4>
                  <p>Duration: {flightDeparture.itineraries[0].duration}</p>
                  <p>Departutre Date: {flightDeparture.lastTicketingDate}</p>
                  <p>2 Adults, 1 Child</p>
                  <p className="flight-name">11:59pm Seattle</p>
                  <p>Seattle-Tacoma International Airport</p>
                  <p>5h 7m flight</p>
                  <p>Jet Blue</p>
                  <p>Airbus A320-200</p>
                  <p>Cabin: {flightDeparture.travelerPricings[0].fareDetailsBySegment[0].cabin}</p>
                  <p>Arrival: 8:06am New York City</p>
                  <p>John F. Kennedy International Airport</p>
                </div>
                <div className="flight-container">
                  <h4 className="flight-summary">
                  {cityDesName[0].cityName} to {cityOriginName.cityName}
                  </h4>
                  <p>6:00am-9:19pm (15h 19m)</p>
                  <p>Wed, Apr 18</p>
                  <p>2 Adults, 1 Child</p>
                  <p className="flight-name">6:00am New York City</p>
                  <p>LaGuardia Airport</p>
                  <p>7h 6m flight</p>
                  <p>Frontier</p>
                  <p>Airbus A321-200 Neo</p>
                  <p>Economy</p>
                  <p>11:06am Denver</p>
                  <p>Denver International Airport</p>
                  <p>7:10pm Denver</p>
                  <p className="flight-name">Denver International Airport</p>
                  <p>3h 9m flight</p>
                  <p>Frontier</p>
                  <p>Airbus A320-200 Neo</p>
                  <p>Economy</p>
                  <p>9:19pm Seattle</p>
                  <p>Seattle-Tacoma International Airport</p>
                </div>
              </div>
              <div className="button-container">
                <Link to={'/master_table'} className="booking-button">Change Flight</Link>
                {/* <button className="booking-button" onClick={'/master_table'}>Change Flight</button> */}
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
                <Link to={'/master_table'} className="booking-button">Change Stay</Link>
                {/* <button className="booking-button" onClick={'/master_table'}>Change Stay</button> */}
              </div>
            </div>
            <div className="cost-container">
              <div className="cost-title-container">
                <h3 className="cost-heading">Cost Details</h3>
              </div>
              <div className="cost-detail-container">
                <table className="cost-table">
                  <tbody className="cost-table-body">
                    <tr className="cost-table-row">
                      <td className="item-data">Flights</td>
                      <td className="cost-data">${hotelOffers.data[0].offers[0].price.total}</td>
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
                      <td className="total-data">$2,880</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="button-container">
                <Link to={'/bookingdetails'} className="booking-button">Booking Details</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
