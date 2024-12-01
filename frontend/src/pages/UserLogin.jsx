import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const SubmitHandler = (e) => {
    e.preventDefault();
    // Add API call to authenticate user
    setUserData({
      email: email,
      password: password
    })

    // Reset form inputs
    setEmail('');
    setPassword('');

  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />

        <form onSubmit={(e) => { SubmitHandler(e) }}>
          <h3 className='text-lg font-medium mb-2'>Enter your Email</h3>
          <input required type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className='bg-[#eeeeee] text-lg placeholder:text-base mb-7 border w-full px-4 py-2 rounded ' placeholder='email@example.com' />

          <h3 className='text-lg font-medium mb-2'>Enter your Password</h3>
          <input required type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className='bg-[#eeeeee] text-lg placeholder:text-base mb-7 border w-full px-4 py-2 rounded ' placeholder='password' />

          <button
            className='bg-[#111] text-white font-semibold text-lg placeholder:text-base mb-3 border w-full px-4 py-2 rounded '
          >Login</button>
          <p className='text-center'>New Here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
        </form>
      </div>

      <div>
        <Link to='/captain-login'
          className='bg-[#f1ce3e] flex text-center justify-center text-black text-lg placeholder:text-base mb-5 border w-full px-4 py-2 rounded '
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin