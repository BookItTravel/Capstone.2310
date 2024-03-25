import './navbar.css'
import Logo from '../../assets/BookItLogo.png';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';


function Navbar() {

    return (
        <section className="navBarsection">
            <header className="header-flex">

                <div className="logoDiv">
                    <a href="/" className='logo flex'>
                        <img src={Logo} className="navBar-icon" />
                    </a>
                </div>

                <div className="navBar">
                    <ul className='navLists flex'>
                        <li className='navItem'>
                            <a href="/" className='navLink'>Home</a>
                        </li>
                        <li className='navItem'>
                            <a href="#" className='navLink'>Packages</a>
                        </li>
                        <li className='navItem'>
                            <a href="#" className='navLink'>Flight</a>
                        </li>
                        <li className='navItem'>
                            <a href="#" className='navLink'>Stay</a>
                        </li>
                        <li className='navItem'>
                            <a href="/profile" className='navLink'>Profile</a>
                        </li>
                        <button className='btn'>
                            <a href="/login">Sign In</a>
                        </button>
                    </ul>
                    <div className="closeNavbar">
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>

                <div className="toggleNavbar">
                    <TbGridDots className="icon" />
                </div>

            </header>
        </section>
    )
}

export default Navbar