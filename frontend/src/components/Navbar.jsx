import React, { useContext } from 'react'
import logo from "../assets/Logo.svg"
import { useNavigate } from 'react-router-dom'
import { AuthDataContext } from '../contexts/AuthContext'
import axios from 'axios'

const Navbar = () => {
  const { serverUrl, userData, setuserData } = useContext(AuthDataContext)
  const navigate = useNavigate()

  const handleLogOut = async(e) =>{
    e.preventDefault()
    try {
      const result = await axios.post(`${serverUrl}/api/auth/logout`, {withCredentials : true})
      navigate('/login')
    } catch (error) {
      console.log(error.message)
    }
  } 

  return (
    <div className='w-full bg-white border-b border-gray-100 shadow-sm'>
      <nav className='max-w-7xl mx-auto h-20 px-6 flex justify-between items-center'>
        
        <div className='flex items-center'>
          <img src={logo} alt="Logo" className='h-10 w-auto object-contain cursor-pointer' onClick={()=>navigate('/')}/>
        </div>

        <div className='flex items-center gap-4'>
          {userData ? (
            <div className='flex items-center gap-4'>
              <span className='text-sm text-gray-600 font-medium hidden sm:inline-block'>
                Welcome, {userData.name || 'Admin'}
              </span>
              <button className='px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-800 transition-colors font-semibold rounded-xl text-sm cursor-pointer' onClick={()=>navigate('/admin')}>
                Dashborad
              </button>
              <button className='px-5 py-2.5 bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-semibold rounded-xl text-sm cursor-pointer' onClick={handleLogOut}>
                Logout
              </button>
            </div>
          ) : (
            <button className='px-5 py-2.5 bg-blue-700 hover:bg-blue-800 transition-colors text-white font-semibold rounded-xl text-sm shadow-md cursor-pointer' onClick={()=>navigate('/login')}>
              Login
            </button>
          )}
        </div>

      </nav>
    </div>
  )
}

export default Navbar
