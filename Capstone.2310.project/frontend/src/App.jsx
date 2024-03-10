import { useState } from 'react'
import './App.css'

import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer'
// import Register from './Components/Register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Navbar />
      <Home />
      <Main />
      <Footer />
    </>
  )
}

export default App
