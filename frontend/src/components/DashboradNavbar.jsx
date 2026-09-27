import React, { useContext } from 'react'
import logo from "../assets/Logo.svg"
import { useNavigate } from 'react-router-dom'
import { AuthDataContext } from '../contexts/AuthContext'
import axios from 'axios'

const DashboradNavbar = () => {
  const { serverUrl, userData, setuserData } = useContext(AuthDataContext)
  const navigate = useNavigate()

  const handleLogOut = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true })
      setuserData(null)
      navigate('/login')
    } catch (error) {
      console.error(error.message)
    }
  } 

  return (
    <div className='w-full bg-white border-b border-gray-100 shadow-sm'>
      <nav className='max-w-7xl mx-auto h-20 px-6 flex justify-between items-center'>
        
        <div className='flex items-center gap-3'>
          <img 
            src={logo} 
            alt="Logo" 
            className='h-10 w-auto object-contain cursor-pointer' 
            onClick={() => navigate('/')}
          />
          <span className='text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded-md hidden sm:inline-block'>
            Admin Panel
          </span>
        </div>

        <div className='flex items-center gap-4'>
          {userData && (
            <span className='text-sm text-gray-600 font-medium hidden sm:inline-block'>
              {userData.name}
            </span>
          )}
          <button 
            className='px-5 py-2.5 bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-semibold rounded-xl text-sm cursor-pointer' 
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>

      </nav>
    </div>
  )
}

export default DashboradNavbar
