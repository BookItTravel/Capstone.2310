import { useNavigate } from 'react-router-dom';
import './HotelOfferCard.css';

const HotelOfferCard = ({hotelOffers}) => {
    const navigate = useNavigate();

    const handleBookButtonClick = () => {
        navigate('/booking');
    };
   console.log("hotelOffers Card", hotelOffers)
     // Ensure hotelOffers is not null or undefined before attempting to map
     if (!hotelOffers || !hotelOffers.data || !Array.isArray(hotelOffers.data)) {
        return null; // Or handle the case where hotelOffers is invalid
    }
    return (
        <div className="offer-card">
       {hotelOffers.data.map((offerData, index) => (
            <div key={index}>
                <div className="price-section">
                <div className="offer-name">
                        <h3 className="offer-heading">{offerData.hotel.name} </h3>
                    </div>
                    <div className="offer-price">
                        <h3 className="offer-heading">${offerData.offers[0].price.total} </h3>
                        <p className="small-text">per night/ {offerData.offers[0].price.variations.average.base} </p>
                    </div>
                </div>
                <div className="room-section">
                    <div className="room-type">
                        <h3 className="offer-heading">Standard</h3>
                        <h5 className="offer-heading">Bed</h5>
                        <p className="offer-text">{offerData.offers[0].room.typeEstimated.bedType} {offerData.offers[0].room.typeEstimated.beds}</p>
                    </div>
                    <div className="room-description">
                        <h5 className="offer-heaing">Description</h5>
                        <p className="offer-text">{offerData.offers[0].room.description.text}.</p>
                    </div>
                    <div className="room-policy">
                        <h3 className="offer-heading">Cancellations</h3>
                        <p className="offer-text">Cancel before: {offerData.offers[0].policies.cancellations[0].deadline}</p>
                        <h5 className="offer-heading">Cancellation Fee</h5>
                        <p className="offer-text"> {offerData.offers[0].policies.cancellations[0].amount}</p>
                <div className="card-button">
                    <button className="booking-button" onClick={handleBookButtonClick}>Book It!</button>
                </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
)
};

export default HotelOfferCard;