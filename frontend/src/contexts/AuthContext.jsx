import React, { createContext, useState } from 'react'
export const AuthDataContext = createContext()
import axios from "axios"
import { useEffect } from 'react'

const AuthContext = ({children}) => {
  const serverUrl = "http://localhost:7000"
  const [userData, setuserData] = useState(null)
    const [loading, setloading] = useState(false)
  const value = {
    serverUrl, 
    userData, setuserData
  }

  const getCurrentUser = async() =>{
    try {
      const response = await axios.get(`${serverUrl}/api/auth/get-user`, {withCredentials : true})
      if (response.data.success) {
        setuserData(response.data.user);
      }
    } catch (error) {
      setuserData(null);

      console.log(
        "User is not logged in:",
        error.response?.data?.message
      );
    }finally {
      setloading(false);
    }
  };

  useEffect(()=>{
    getCurrentUser();
  },[])

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  )
}

export default AuthContext
