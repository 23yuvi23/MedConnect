import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
    // create state variable to manage Admin or Doctor Login state
    const [state, setState] = useState('Admin')

    // destructure backendUrl by using this we can call API in this page
    const {setAToken,backendUrl} = useContext(AdminContext)

    // state variable to store Email and Password
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    // function when form is submitted 
    const onSubmitHandler = async (event)=>{
        event.preventDefault()
        // api calling using axios
        try {

            if (state === 'Admin') {
                const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
                if (data.success) {
                    // console.log(data.token);
                    // set token in local storage 
                    localStorage.setItem('aToken',data.token)

                    // save token in setAToken
                    setAToken(data.token)
                } else {
                    toast.error(data.message)
                }
            } else {

            }


        } catch (error) {
            
        }
    }
    
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'><span className='text-primary'> { state } </span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                {/* link email state */}
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required/>
            </div>

            <div className='w-full'>
                <p>Password</p>
                 {/* link password state */}
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required/>
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
            {
                state === 'Admin'
                ? <p>Doctor Login? <span onClick={()=>setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
                : <p>Admin Login? <span onClick={()=>setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login