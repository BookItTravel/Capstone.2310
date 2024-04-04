import { Link } from 'react-router-dom';
import "./Booking.css";
import { useLocation } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const { flightDeparture, flightReturn } = location.state;


    console.log("booking prop departure", flightDeparture);
    console.log("booking prop return", flightReturn);
 
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
              {/* { flightDeparture.} */}
              <div className="trip-card">
                <div className="flight-container">
                <h4 className="flight-summary">{flightDeparture.itineraries[0].segments[0].arrival.iataCode} to {flightReturn.itineraries[0].segments[0].arrival.iataCode}</h4>
                  <p>Duration: {flightDeparture.itineraries[0].duration}</p>
                  <p>Departutre Date: {flightDeparture.lastTicketingDate}</p>
                  <p>2 Adults, 1 Child</p>
                  <p className="flight-name">11:59pm Seattle</p>
                  <p>Seattle-Tacoma International Airport</p>
                  <p>5h 7m flight</p>
                  <p>Jet Blue</p>
                  <p>Airbus A320-200</p>
                  <p>Cabin: {flightDeparture.travelerPricings[0].fareDetailsBySegment[0].cabin}</p>
                  <p>8:06am New York City</p>
                  <p>John F. Kennedy International Airport</p>
                </div>
                <div className="flight-container">
                  <h4 className="flight-summary">
                    New York City to Denver to Seattle
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
                <button className="booking-button">Change Flight</button>
              </div>
            </div>
            <div className="hotel-card">
              <div className="column-heading">
                <h3 className="column-title">Stay</h3>
              </div>
              <div className="hotel-container">
                <p className="hotel-name">Aloft New York Brooklyn</p>
                <p>Brooklyn, NY</p>
                <p>Check In: April 11, 2024</p>
                <p>Check Out: April 18, 2024</p>
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
                <table className="cost-table">
                  <tbody className="cost-table-body">
                    <tr className="cost-table-row">
                      <td className="item-data">Flights</td>
                      <td className="cost-data">$1,200</td>
                    </tr>
                    <tr className="cost-table-row">
                      <td className="item-data">Stay</td>
                      <td className="cost-data">$2,100</td>
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
