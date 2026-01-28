import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {

  // display doc data till backend is not ready 

  const { doctors } = useContext(AppContext)
  return (
    <div>
        <p>
          My apppointments
        </p>
        <div>

        </div>
    </div>
  )
}

export default MyAppointments