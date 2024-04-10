import { useState } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
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



import './App.css';



function App() {
  const [count, setCount] = useState(0);
  const [flightDataDeparture, setFlightDataDeparture] = useState([]);
  const [flightDataReturn, setFlightDataReturn] = useState(null);

  console.log("selected flight form app", flightDataDeparture)




  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/booking" element={<Booking 
                   flightDataDeparture={flightDataDeparture}
                   flightDataReturn={flightDataReturn} />} />
            <Route path="/bookingdetails" element={<BookingDetails />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/master_table" element={<Master_Table
                   setFlightDataDeparture={setFlightDataDeparture}
                   setFlightDataReturn={setFlightDataReturn}
             />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App