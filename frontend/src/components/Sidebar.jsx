import React, { useContext } from 'react'
import { AiTwotoneFolderAdd } from "react-icons/ai"
import { RiHome9Line } from "react-icons/ri"
import { FaListAlt } from "react-icons/fa"
import { AuthDataContext } from '../contexts/AuthContext'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const {userData, setuserData} = useContext(AuthDataContext)
  return (
    <div className='w-64 h-full bg-white text-gray-800 flex flex-col justify-between p-4 border-r border-gray-200 font-sans shadow-sm'>
      <div className='flex flex-col gap-8'>
        
        <div className='px-4 py-2'>
          <h2 className='text-xl font-bold text-gray-900 tracking-wider uppercase'>Admin Panel</h2>
        </div>

        <div className='flex flex-col gap-1'>
          <div 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer group ${
              activeTab === 'dashboard' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <RiHome9Line className={`text-2xl ${activeTab === 'dashboard' ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
            <p className='text-base font-semibold'>Dashboard</p>
          </div>
          
          <div 
            onClick={() => setActiveTab('add-blogs')}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer group ${
              activeTab === 'add-blogs' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <AiTwotoneFolderAdd className={`text-2xl ${activeTab === 'add-blogs' ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
            <p className='text-base font-semibold'>Add blogs</p>
          </div>

          <div 
            onClick={() => setActiveTab('blog-lists')}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer group ${
              activeTab === 'blog-lists' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <FaListAlt className={`text-2xl ${activeTab === 'blog-lists' ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'}`} />
            <p className='text-base font-semibold'>Blog lists</p>
          </div>
        </div>

      </div>

      <div className='px-4 py-3 border-t border-gray-100 flex items-center gap-3'>
        <div className='w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm'>
          {userData?.name[0]}
        </div>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold text-gray-900 leading-none mb-0.5'>{userData?.name}</span>
          <span className='text-xs text-gray-400 leading-none'>Logged In</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
