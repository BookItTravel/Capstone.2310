import HotelOfferCard from "./HotelOfferCard";
import './HotelOffer.css';


const HotelOffer = ({ onClose }) => {

    //TODO: Need logic to render as many room offers as there are for the hotel for the given date.

    return (
        <div className="hotel-offer-container">
            <div className="offer-popup">
                <div className="popup-header">
                    <span className="close" onClick={onClose}>X</span>
                    <h3 className="popup-heading">Select Your Room</h3>
                </div>
                <div className="stay-summary">
                    <h4 className="offer-dates">4-10-2024 to 4-12-2024</h4>
                    <p className="hotel-offer">Renaissance Seattle Hotel</p>
                </div>
                <div className="room-card-container">
                    <HotelOfferCard />
                    <HotelOfferCard />
                    <HotelOfferCard />
                    <HotelOfferCard />
                    <HotelOfferCard />
                    <HotelOfferCard />
                    <HotelOfferCard />
                </div>
            </div>
        </div>
    );
};

export default HotelOffer;