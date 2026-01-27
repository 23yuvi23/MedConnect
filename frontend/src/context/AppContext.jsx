import { createContext } from "react";
import { doctors } from "../assets/assets";

// create app context
export const AppContext = createContext()

// create context provider function
const AppContextProvider = (props) =>{

    // created currncy symbol here so that if we need to change symbol we have to change it at one place 
    const currencySynbol = '$'

    const value ={
        doctors,
        currencySynbol

    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider