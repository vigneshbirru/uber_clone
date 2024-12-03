import React from 'react'
import {Link} from "react-router-dom"
import logo from "../assets/logo.png"
const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  h-screen flex pt-8 justify-between flex-col w-full bg-red-400'>
        <img className="w-12  ml-10" src={logo} />
        <div className='bg-white py-4 px-4'>
          <h2 className='text-3xl pb-7 font-bold '>Get Started with Uber</h2>
          <Link to='/login' className='flex items-center justify-center  bg-black text-white py-3 rounded mt-4 '>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start