import { useState } from 'react'
import './App.css'

import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Booking from './Pages/Booking/Booking'
import BookingDetails from './Pages/BookingDetails/BookingDetails'
import Confirmation from './Pages/Confirmation/Confirmation'
//import Flight_Main from './Components/Flight/Flight_Main'
import Profile from './Pages/Profile/Profile'
 import Flight_Search from './Components/Flight_Search/Flight_Search'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Flights from './Components/Flight/flight'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Home />
      </div>
      <div>
        <Main />
      </div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookingdetails" element={<BookingDetails />} />
          <Route path="/confirmation" element={<Confirmation />} />
          {/* <Route path="/" element={<Main />} /> */}
        </Routes>
        <Profile />
        {/* <Flight_Main /> */}
      <Flight_Search />
      </BrowserRouter>
      <Flights />
      <Footer />
    </>
  )
}

export default App
