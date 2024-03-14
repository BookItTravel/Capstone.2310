import '../Profile/Profile.css';
import { CgProfile } from "react-icons/cg";

function Profile() {
    return (
        <div className='profile-container'>
            <div className='left-column'>
                <div className='custom-div'>
                    <h1 className="profile-heading">Profile Information</h1>
                    <form className='flex-container'>
                        <CgProfile className='profile-icon' />
                        <input type="text" placeholder='username' className="custom-input" />
                        <input type="email" placeholder='email' className="custom-input" />
                        <input type="text" placeholder='password' className="custom-input" />
                        <button className="custom-button">Update</button>
                    </form>
                    <div className='custom-container'>
                        <span className="custom-span">Delete Account</span>
                        <span className="custom-span">Sign Out</span>
                    </div>
                </div>
            </div>
            <div className='right-column'>
                <h1 className="profile-heading">Settings</h1>
                <div className='settings'></div>
                <h1 className="profile-heading">Booking History</h1>
                <div className='booking-history'></div>
                <h1 className="profile-heading">Upcoming Trips</h1>
                <div className='upcoming-trips'></div>
                <h1 className="profile-heading">Payment Methods</h1>
                <div className='payment-methods'></div>
                <h1 className="profile-heading">Rewards and Loyalty Program</h1>
                <div className='rewards'></div>
                <h1 className="profile-heading">Support</h1>
                <div className='support'></div>
            </div>
        </div>
    );
}

export default Profile;
