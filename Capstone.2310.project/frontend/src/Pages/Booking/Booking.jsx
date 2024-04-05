import { Link } from "react-router-dom";
import "./Booking.css";
import { useLocation, useNavigate } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const {
    flightDeparture,
    flightReturn,
    hotelOffers,
    cityDesName,
    cityOriginName,
  } = location.state;

  console.log("booking prop departure", flightDeparture);
  console.log("booking prop return", flightReturn);
  console.log("Data hotel Offer Card in booking", hotelOffers);
  console.log("Data desName in booking", cityDesName);
  console.log("Data originName in booking", cityOriginName);

  const flightTotal =
    flightDeparture.travelerPricings[0].price.total >=
    flightReturn.travelerPricings[0].price.total
      ? flightDeparture.travelerPricings[0].price.total
      : flightReturn.travelerPricings[0].price.total;

  const totalFlightCost = parseFloat(flightTotal);
  const totalHotelCost = parseFloat(hotelOffers.data[0].offers[0].price.total);
  const totalBeforeSavings = totalFlightCost + totalHotelCost;
  const totalAfterSavings = totalBeforeSavings - 320;

  const convertDuration = (durationString) => {
    const matches = durationString.match(/PT(\d+)H(\d+)M/);
    if (!matches) return "Invalid duration";

    const hours = parseInt(matches[1]);
    const minutes = parseInt(matches[2]);

    const formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    return formattedDuration;
  };

  const durationDeparture = flightDeparture.itineraries[0].duration;
  const convertedDuration = convertDuration(durationDeparture);

  const durationReturn = flightReturn.itineraries[0].duration;
  const convertedDurationReturn = convertDuration(durationReturn);

  const convertDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();

    return `${date} ${time}`;
  };

  const dateTimeString =
    flightDeparture.itineraries[0].segments[0].departure.at;
  const formattedDateTimeDepart = convertDateTime(dateTimeString);

  const dateTimeStringArrivalDepart =
    flightReturn.itineraries[0].segments[0].arrival.at;
  const formattedDateTimeDepartArrival = convertDateTime(dateTimeString);

  const dateTimeStringReturn =
    flightReturn.itineraries[0].segments[0].departure.at;
  const formattedDateTimeReturn = convertDateTime(dateTimeString);

  const navigate = useNavigate();
  const handleBookButtonClick = () => {
      navigate('/bookingdetails', { state: { totalAfterSavings } });
  }

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
                  <h4 className="flight-summary">
                    {cityOriginName.cityName} to {cityDesName[0].cityName}
                  </h4>
                  <p>
                    Airline:{" "}
                    {flightDeparture.itineraries[0].segments[0].carrierCode}
                  </p>
                  <p>Duration: {convertedDuration}</p>
                  <p className="flight-name">11:59pm Seattle</p>
                  <p>Seattle-Tacoma International Airport</p>
                  <p>Departure Time: {formattedDateTimeDepart} </p>
                  <p>Jet Blue</p>
                  <p>
                    {flightDeparture.itineraries[0].segments[0].carrierCode}
                  </p>
                  <p>
                    {flightDeparture.itineraries[0].segments[0].aircraft.code}
                  </p>
                  <p>
                    Cabin:{" "}
                    {
                      flightDeparture.travelerPricings[0]
                        .fareDetailsBySegment[0].cabin
                    }
                  </p>
                  <p>Arrival: {formattedDateTimeDepartArrival}</p>
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
                  <p>{flightReturn.itineraries[0].segments[0].carrierCode}</p>
                  <p>{flightReturn.itineraries[0].segments[0].aircraft.code}</p>
                  <p>
                    Cabin:{" "}
                    {
                      flightReturn.travelerPricings[0].fareDetailsBySegment[0]
                        .cabin
                    }
                  </p>
                  <p>11:06am Denver</p>
                  <p>Denver International Airport</p>
                  <p>7:10pm Denver</p>
                  <p className="flight-name">Denver International Airport</p>
                  <p>3h 9m flight</p>
                  <p>Airbus A320-200 Neo</p>
                  <p>Economy</p>
                  <p>9:19pm Seattle</p>
                  <p>Seattle-Tacoma International Airport</p>
                </div>
              </div>
              <div className="button-container">
                <Link to={"/master_table"} className="booking-button">
                  Change Flight
                </Link>
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
                <Link to={"/master_table"} className="booking-button">
                  Change Stay
                </Link>
              </div>
            </div>
            <div className="cost-container">
              <div className="cost-title-container">
                <h3 className="cost-heading">Cost Details</h3>
              </div>
              <div className="cost-detail-container">
                <table className="cost-table">
                  <tbody className="cost-table-body">
                    <p>Order Date: {flightDeparture.lastTicketingDate}</p>
                    <tr className="cost-table-row">
                      <td className="item-data">Flights</td>
                      <td className="cost-data">
                        {flightDeparture.travelerPricings[0].price.total >=
                        flightReturn.travelerPricings[0].price.total
                          ? `$${flightDeparture.travelerPricings[0].price.total}`
                          : `$${flightReturn.travelerPricings[0].price.total}`}
                      </td>
                    </tr>
                    <tr className="cost-table-row">
                      <td className="item-data">Stay</td>
                      <td className="cost-data">
                        ${hotelOffers.data[0].offers[0].price.total}
                      </td>
                    </tr>
                    <tr className="cost-table-row">
                      <td className="item-data">Savings</td>
                      <td className="savings-data">-$320</td>
                    </tr>
                    <tr className="cost-table-row">
                      <td className="total-name">Total</td>
                      <td className="total-data">
                        {" "}
                        ${totalAfterSavings.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="button-container">
                <button onClick={handleBookButtonClick} className="booking-button">
                  Booking Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
