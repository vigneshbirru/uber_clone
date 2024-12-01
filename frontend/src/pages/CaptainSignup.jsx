import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState('')
  const [userData, setUserData] = useState({});

  const SubmitHandler = (e) => {
    e.preventDefault();
    // Add API call to authenticate user
    setUserData({
      Fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,

    })
    setEmail('');
    setPassword('');
    setfirstname('');
    setlastname('');
  }

  return (

    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />

        <form onSubmit={(e) => { SubmitHandler(e) }}>

          <h3 className='text-lg font-medium mb-2'>Enter your name</h3>
          <div className='flex gap-4  mb-3'>
            <input required type="text"
              value={firstname}
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
              className='bg-[#eeeeee] text-base placeholder:text-sm mb-3 border w-1/2 px-4 py-2 rounded '
              placeholder='First name' />

            <input required type="text"
              value={lastname}
              onChange={(e) => {
                setlastname(e.target.value);
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

          <button
            className='bg-[#111] text-white font-semibold text-lg placeholder:text-base mb-3 border w-full px-4 py-2 rounded '
          >Login</button>
          <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
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