import { useState } from 'react'
import './App.css'

import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Home />
      {/* <Main />
      <Footer />
      <h1>Hello from app comp</h1> */}




    </>
  )
}

export default App
