import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { AuthDataContext } from '../contexts/AuthContext'

const Signup = () => {
  const {serverUrl, userData, setuserData} = useContext(AuthDataContext)
  const navigate = useNavigate()
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [errors, seterrors] = useState('')
  const [loading, setloading] = useState(false)

  const handleSubmit = async(e)=>{
    e.preventDefault()
    seterrors('')
    setloading(true)

    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`,
        {name, email, password}, {withCredentials : true}
      )
      setloading(false)
      console.log(result.data)
      setuserData(result.data)
      navigate('/login')
    } catch (error) {
      seterrors( error.response?.data?.message)
      setloading(false)
      console.log(error)
    }
  }


  return (
    <div className='w-full h-screen p-0 m-0 bg-white flex justify-center items-center font-sans'>
      <div className='w-[440px] border-1 border-blue-400 p-10 bg-white flex flex-col justify-center items-center gap-3 rounded-2xl shadow-2xl'>
        
        <div className='flex flex-col justify-center items-center text-center gap-2'>
          <h1 className='text-blue-900 text-3xl font-bold'>Admin <span className='text-black'>Login</span></h1>
          <p className='w-80 text-gray-500 text-sm'>Enter your credentials to access the admin panel</p>
        </div>

        {errors && (
          <div>
            <p className='text-red-500 text-sm'>{errors}</p>
          </div>
        )}

        <div className='w-full flex flex-col bg-white'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
              <label className='text-gray-700 text-sm font-semibold'>Name</label>
              <input 
                type="text" 
                placeholder='Enter your name' 
                onChange={(e)=>setname(e.target.value)} value={name}
                className='w-full text-black p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 text-base' 
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-gray-700 text-sm font-semibold'>Email</label>
              <input 
                type="email" 
                placeholder='Enter your email' 
                onChange={(e)=>setemail(e.target.value)} value={email}
                className='w-full text-black p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 text-base' 
              />
            </div>
            
            <div className='flex flex-col gap-1'>
              <label className='text-gray-700 text-sm font-semibold'>Password</label>
              <input 
                type="password" 
                placeholder='Enter your password' 
                onChange={(e)=>setpassword(e.target.value)} value={password}
                className='w-full text-black p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 text-base' 
              />
            </div>  

            <button className='w-full bg-blue-700 hover:bg-blue-800 transition-colors text-white font-bold p-3 rounded-xl text-base mt-2 cursor-pointer'>
              {loading?"Loading" : "Signup"}
            </button>
          </form>
        </div>

        <div>
          <p className='text-sm text-gray-600'>
            Already an Account? <span className='text-blue-700 font-semibold cursor-pointer hover:underline' onClick={()=>navigate('/login')}>Login</span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Signup
