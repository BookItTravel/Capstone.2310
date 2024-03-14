const Booking = () => {
    return (
        <div className="booking-container">
            <div className="title-container">
                <h1 className="booking-heading">Your Trip</h1>
            </div>
            <div className="review-container">
                <div className="section-title-container">
                    <h2 className="review-heading">Review your trip</h2>
                </div>
                <div className="left-column">
                    <div className="column-heading">
                        <h3 className="column-title">Flights</h3>
                    </div>
                    <div className="trip-container">
                        <h4>Seattle to New York City</h4>
                        <p>11:59pm-8:06am (5h 7m)</p>
                        <p>Wed, Apr 10</p>
                        <p>11:59pm Seattle</p>
                        <p>Seattle-Tacoma International Airport</p>
                        <p>5h 7m flight</p>
                        <p>Jet Blue</p>
                        <p>Airbus A320-200</p>
                        <p>Economy</p>
                        <p>8:06am New York City</p>
                        <p>John F. Kennedy International Airport</p>
                    </div>
                    <div className="trip-container">
                        <h4>New York City to Denver to Seattle</h4>
                        <p>6:00am-9:19pm (15h 19m)</p>
                        <p>Wed, Apr 18</p>
                        <p>6:00am New York City</p>
                        <p>LaGuardia Airport</p>
                        <p>7h 6m flight</p>
                        <p>Frontier</p>
                        <p>Airbus A321-200 Neo</p>
                        <p>Economy</p>
                        <p>11:06am Denver</p>
                        <p>Denver International Airport</p>
                        <p>7:10pm Denver</p>
                        <p>Denver International Airport</p>
                        <p>3h 9m flight</p>
                        <p>Frontier</p>
                        <p>Airbus A320-200 Neo</p>
                        <p>Economy</p>
                        <p>9:19pm Seattle</p>
                        <p>Seattle-Tacoma International Airport</p>
                    </div>
                    <div className="button-container">
                        <button>Change Flight</button>
                    </div>
                </div>
                <div className="right-column">
                    <div className="column-heading">
                        <h3 className="column-title">Stay</h3>
                    </div>
                    <div className="hotel-container">
                        <p>Aloft New York Brookly</p>
                        <p>Brooklyn, NY</p>
                        <p>April 11, 2024</p>
                        <p>April 18, 2024</p>
                    </div>
                    <div className="button-container">
                        <button>Change Stay</button>
                    </div>
                </div>
            </div>
            <div className="cost-container">
                <div className="section-title-container">
                    <h2 className="cost-heading">Cost Details</h2>
                </div>
                <div className="cost-detail-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Flights</td>
                                <td>$1,200</td>
                            </tr>
                            <tr>
                                <td>Stay</td>
                                <td>$2,100</td>
                            </tr>
                            <tr>
                                <td>Savings</td>
                                <td>-$320</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>$2,880</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="button-container">
                    <button>Booking Details</button>
                </div>
            </div>
        </div>  
    );
};

export default Booking;