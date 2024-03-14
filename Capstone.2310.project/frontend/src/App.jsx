import { useState } from 'react'
import './App.css'

import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Flight_Main from './Components/Flight/Flight_Main'
import Profile from './Pages/Profile/Profile'
// import Flight_Search from './Components/Flight_Search/Flight_Search'

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Home />
      <Main />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Profile />
        <Flight_Main />
      </BrowserRouter>
    </>
  )
}

export default App
