import { useNavigate } from 'react-router-dom';
import './HotelOfferCard.css';

const HotelOfferCard = () => {
    const navigate = useNavigate();

    const handleBookButtonClick = () => {
        navigate('/booking');
    };

    return (
        <div className="offer-card">
            <div className="price-section">
                <div className="offer-price">
                    <h3 className="offer-heading">$400</h3>
                    <p className="small-text">per Traveler</p>
                </div>
            </div>
            <div className="room-section">
                <div className="room-type">
                    <h3 className="offer-heading">Standard</h3>
                </div>
                <div className="bed-type">
                    <h3 className="offer-heading">Bed</h3>
                    <p className="offer-text">King</p>
                </div>
                <div className="room-description">
                    <h3 className="offer-heaing">Description</h3>
                    <p className="offer-text">Marriott Senior Discount, 1 King, Mini Fridge, 335 sqft/ 30sqm, Wireless Internet, for a fee.</p>
                </div>
                <div className="room-policy">
                    <h3 className="offer-heading">Cancellations</h3>
                    <p className="offer-text">Deadline: 3-19-2024</p>
                </div>
            </div>
            <div className="card-button">
                <button className="booking-button" onClick={handleBookButtonClick}>Book It!</button>
            </div>
        </div>
    )
};

export default HotelOfferCard;