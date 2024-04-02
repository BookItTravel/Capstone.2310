import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Components/LandingPage/LandingPage'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Booking from './Pages/Booking/Booking'
import BookingDetails from './Pages/BookingDetails/BookingDetails'
import Confirmation from './Pages/Confirmation/Confirmation'
import Profile from './Pages/Profile/Profile'
import Master_Table from './Components/Master_Table/Master_Table'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Flights from './Components/Flight_Search/Flights'
import Airport from './Components/Flight/airport'
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51P0ushRsNEKpqF1rwE3Z5A4ExGMbur7Ca9cGRRsfvMu0U1QPxIc0yttLGCiDgUOuqKxA1yB8wh5TlpJybmaLi9cL00rMQc5pE1")

function App() {
  const [count, setCount] = useState(0);




  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookingdetails" element={<BookingDetails />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/master_table" element={<Master_Table />} />
         
          <Route path='/airport' element={<Airport />} />
          <Route path='/flights' element={<Flights />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App