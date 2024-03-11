
import '../Flight_Search/Flight_Search.scss'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { RiAccountPinCircleLine } from 'react-icons/ri'
import { RiCalendar2Fill } from "react-icons/ri";



function Flight_Search() {
    return (
        <div className="search container section">
            <div className="sectionContainer grid">

                <div className="btns flex">
                    <div className="singlBtn">
                        <span>Economy</span>
                    </div>

                    <div className="singlBtn">
                        <span>Business Class</span>
                    </div>

                    <div className="singlBtn">
                        <span>First Class</span>
                    </div>
                </div>

                <div className="searchInputs flex">
                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <HiOutlineLocationMarker className="icon" />
                        </div>
                        <div className="texts">
                            <h4>Location</h4>
                            <input type="text" placeholder='Where do you want to go?' />
                        </div>

                    </div>

                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <RiAccountPinCircleLine className="icon" />
                        </div>
                        <div className="texts">
                            <h4>Travelers</h4>
                            <input type="text" placeholder='Add guests' />
                        </div>

                    </div>

                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <RiCalendar2Fill className="icon" />
                        </div>
                        <div className="texts">
                            <h4>Check In</h4>
                            <input type="date" placeholder='Add date' />
                        </div>

                    </div>

                    <div className="singleInput flex">
                        <div className="iconDiv">
                            <RiCalendar2Fill className="icon" />
                        </div>
                        <div className="texts">
                            <h4>Check Out</h4>
                            <input type="date" placeholder='Add date' />
                        </div>

                        <button className="btn btnBlock flex">Search Flight</button>

                    </div>


                </div>
            </div>
        </div>
    )
}




export default Flight_Search