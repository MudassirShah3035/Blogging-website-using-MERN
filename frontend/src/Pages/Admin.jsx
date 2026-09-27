import React, { useState } from 'react'
import DashboradNavbar from '../components/DashboradNavbar'
import Sidebar from '../components/Sidebar'
import Dashborad from '../components/Dashborad'
import AddBlog from '../components/AddBlog'
import BlogList from '../components/BlogList'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashborad />
      case 'add-blogs':
        return <AddBlog />
      case 'blog-lists':
        return <BlogList />
      default:
        return <Dashborad />
    }
  }

  return (
    <div className='min-h-screen bg-gray-50/50 flex flex-col font-sans'>
      <header className='fixed top-0 left-0 right-0 z-50 h-20 bg-white'>
        <DashboradNavbar />
      </header>

      <div className='flex flex-1 pt-20 h-screen overflow-hidden'>
        <aside className='fixed top-20 left-0 bottom-0 w-64 bg-white z-40 hidden md:block'>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>

        <main className='flex-1 md:pl-64 h-full overflow-y-auto'>
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default Admin
