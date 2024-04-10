import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Logo from '../../assets/BookItLogo.png';
import './Confirmation.css';

const Confirmation = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        fetch(`/session-status?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            });

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

    if (status === 'open') {
        return <Navigate to="/bookingdetails" />;
    }

    return (
        <div>
            <div className='confirmation-container'>
                <div className='confirmation-title-container'>
                    <h1 className='confirmation-heading'>Booking Confirmation</h1>
                </div>
                <div className='custom-container-container'>
                    <div className="booking-confirmation-summary">
                        <h2 className="summary-heading">Congratulations!</h2>
                        <div className="card-container">
                            <div className="flight-summary-card">
                                <h3 className="card-heading">Thank You For Booking!</h3>
                                <p>Sit back and enjoy your vacation!</p>
                            </div>
                            <div className="icon-card">
                                <img src={Logo} className='confirmation-icon' />
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
                        <Link className='booking-button' to={'/master_table'}>Book Your Next Trip</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
