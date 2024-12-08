import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom' 
import {CaptainDataContext}  from '../context/CaptainContext';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const CaptainSignup = () => {

  const navigate =useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')

  const { captain, setCaptain } = useContext(CaptainDataContext)


  const SubmitHandler = async (e) => {
    e.preventDefault();
    // Add API call to authenticate user
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      }
    }

    try {
      console.log(import.meta.env.VITE_API_URL);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/captains/register`, captainData);
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
        // console.log("Captain data: ", data.captain);
      }
    } catch (error) {
      if (!import.meta.env.VITE_API_URL) {
        alert("VITE_BASE_URL is not defined. Check your .env file.");
      } else if (error.response?.status === 404) {
        alert("API endpoint not found. Check the backend URL and route.");
      } else {
        alert("An unexpected error occurred. Check console for details.");
      }
    }
    
    
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }

  return (

    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />

        <form onSubmit={(e) => { SubmitHandler(e) }}>

          <h3 className='text-lg font-medium mb-2'>Enter your name</h3>
          <div className='flex gap-4  mb-3'>
            <input required type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              className='bg-[#eeeeee] text-base placeholder:text-sm mb-3 border w-1/2 px-4 py-2 rounded '
              placeholder='First name' />

            <input required type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              className='bg-[#eeeeee] text-base placeholder:text-sm mb-3 border  w-1/2 px-4 py-2 rounded '
              placeholder='Last name' />

          </div>
          <h3 className='text-lg font-medium mb-2'>Enter your Email</h3>
          <input required type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className='bg-[#eeeeee] text-base placeholder:text-sm mb-7 border w-full px-4 py-2 rounded ' placeholder='email@example.com' />

          <h3 className='text-lg font-medium mb-2'>Enter your Password</h3>
          <input required type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className='bg-[#eeeeee] text-base placeholder:text-base mb-7 border w-full px-4 py-2 rounded ' placeholder='password' />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
      <div className='flex gap-4 mb-7'>
        <input
          required
          className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
          type="text"
          placeholder='Vehicle Color'
          value={vehicleColor}
          onChange={(e) => {
            setVehicleColor(e.target.value)
          }}
        />
        <input
          required
          className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
          type="text"
          placeholder='Vehicle Plate'
          value={vehiclePlate}
          onChange={(e) => {
            setVehiclePlate(e.target.value)
          }}
        />
      </div>
      <div className='flex gap-4 mb-7'>
        <input
          required
          className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
          type="number"
          placeholder='Vehicle Capacity'
          value={vehicleCapacity}
          onChange={(e) => {
            setVehicleCapacity(e.target.value)
          }}
        />
        <select
          required
          className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
          value={vehicleType}
          onChange={(e) => {
            setVehicleType(e.target.value)
          }}
        >
          <option value="" disabled>Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="auto">Auto</option>
          <option value="moto">Moto</option>
        </select>
      </div>

          <button
            className='bg-[#111] text-white font-semibold text-lg placeholder:text-base mb-3 border w-full px-4 py-2 rounded '
          >Create Captain Account</button>
          <p className='text-center'>Already have a account? <Link to='/login-captain' className='text-blue-600'>Login here</Link></p>
        </form>
      </div>

      <div>
        <p
          className='text-[13px] leading-tight'
        >This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span > and <span className='underline'>Terms of Service apply</span></p>
      </div>

      

    </div>
  )
}

export default CaptainSignup