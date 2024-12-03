import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, userData);

    if (response.status === 200) {
      const data = response.data;
      const token = data.token; // Ensure the API returns a 'token'
      // console.log("token", token);

      setUser(data.user);
      localStorage.setItem('token', token); // Save token to localStorage
      navigate('/home');
    }


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