

import React, {useState, createContext } from 'react'

export const FlightContext = createContext();

export const FlightContextProvider = props => {
    const [flights, setFlights] = useState([])


    return (
        <FlightContext.Provider value={{flights}}>
            {props.children}
        </FlightContext.Provider>
    )
 }