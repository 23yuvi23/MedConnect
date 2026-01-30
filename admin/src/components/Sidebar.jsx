import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const sidebar = () => {

  // import aToken from Admin context
  const {aToken} = useContext(AdminContext)
  return (
    <div>
        {
          aToken && <ul>  
            <NavLink to = {'/admin-dashboard'}>
                <img src= {assets.home_icon} alt="home" />
                <p>Dashboard</p>
            </NavLink >

            <NavLink to = {'/all-appointments'}>
                <img src= {assets.appointment_icon} alt="home" />
                <p>Appointments</p>
            </NavLink>

            <NavLink to = {'/add-doctor'}>
                <img src= {assets.add_icon} alt="home" />
                <p>Add Doctor</p>
            </NavLink>

            <NavLink to = {'/doctor-list'}>
                <img src= {assets.people_icon} alt="home" />
                <p>Doctors List</p>
            </NavLink>
          </ul>
        }
    </div>
  )
}

export default sidebar