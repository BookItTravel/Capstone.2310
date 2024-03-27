import { useEffect, useState } from 'react';
import './Confirmation.css';

const Confirmation = () => {
    const [confirmationCode, setConfirmationCode] = useState('');

    useEffect(() => {
        // Function to generate a random alphanumeric code
        const generateConfirmationCode = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            
            let code = '';
            
            for (let i =0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                code += characters.charAt(randomIndex);
            }
            
            return code;
        };

        // Generate a random code when the component mounts
        setConfirmationCode(generateConfirmationCode());
    }, []);

    return (
        <div>
            <div className='confirmation-container'>
                <div className='confirmation-title-container'>
                    <h1 className='confirmation-heading'>Booking Confirmation</h1>
                </div>
                <div className='custom-container-container'>
                    <div className="booking-confirmation-summary">
                        <h2 className="summary-heading">Trip Summary</h2>
                        <div className="card-container">
                            <div className="flight-summary-card">
                                <h3 className="card-heading">Flights</h3>
                                <p>Seattle to New York City</p>
                                <p>Departure Date: April 10, 2024</p>
                                <p>New York City to Seattle</p>
                                <p>Return Date Date: April 18, 2024</p>
                            </div>
                            <div className="hotel-summary-card">
                                <h3 className="card-heading">Stay</h3>
                                <p>Aloft New York Brooklyn</p>
                                <p>Check In Date: April 11, 2024</p>
                                <p>Check Out Date: April 18, 2024</p>
                            </div>
                        </div>
                    </div>
                    <div className='confirmation-code-container'>
                        <h3 className='confirmation-code-heading'>Confirmation Code:</h3>
                        <h3 className='confirmation-code'>{confirmationCode}</h3>
                    </div>
                    <div className='contact-container'>
                        <h3 className='contact-heading'>Contact Information</h3>
                        <p><strong>Customer Support: </strong>1-800-123-4567</p>
                        <p><strong>Email: </strong>support@BookIt.com</p>
                    </div>
                    <div className='next-step-container'>
                        <h3 className='next-step-heading'>Next Steps</h3>
                        <ul>
                            <li>Keep this confirmation code for your records.</li>
                            <li>You will receive a confirmation email shortly.</li>
                            <li>Get ready to enjoy your trip!</li>
                        </ul>
                    </div>
                    <div className='button-container'>
                        <button className='booking-button' type="submit">Book Your Next Trip</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Confirmation;