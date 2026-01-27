import { createContext } from "react";
import { doctors } from "../assets/assets";

// create app context
export const AppContext = createContext()

// create context provider function
const AppContextProvider = (props) =>{

    const value ={
        doctors
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider