import './navbar.css'
import { MdOutlineTravelExplore } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';

function Navbar() {

    return (
        <section className="navBarsection">
            <header className="header-flex">

                <div className="logoDiv">
                    <a href="#" className='logo flex'>
                        <h1><MdOutlineTravelExplore className="icon" /> Book It.</h1>
                    </a>
                </div>

                <div className="navBar">
                    <ul className='navLists flex'>
                        <li className='navItem'>
                            <a href="#" className='navLink'>Home</a>
                        </li>
                        <li className='navItem'>
                            <a href="#" className='navLink'>Packages</a>
                        </li>
                        <li className='navItem'>
                            <a href="#" className='navLink'>Flght</a>
                        </li>
                        <li className='navItem'>
                            <a href="#" className='navLink'>Stay</a>
                        </li>
                        <li className='navItem'>
                            <a href="#" className='navLink'>Profile</a>
                        </li>
                        <li className='navItem'>
                            <a href="#" className='navLink'>Contact</a>
                        </li>
                        <button className='btn'>
                            <a href="#">Sign In</a>
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