import '../Profile/Profile.css'
import { CgProfile } from "react-icons/cg";

function Profile() {
    return (
        <div className='custom-div'>
            <h1 class="profile-heading">Profile</h1>
            <form className='flex-container'>
                <CgProfile className='profile-icon' />
                <input type="text" placeholder='username' class="custom-input" />
                <input type="email" placeholder='email' class="custom-input" />
                <input type="text" placeholder='password' class="custom-input" />
                <button class="custom-button">Update</button>
            </form>

            <div className='custom-container'>
                <span class="custom-span">Delete Account</span>
                <span class="custom-span">Sign Out</span>
            </div>
        </div>


    )

}

export default Profile