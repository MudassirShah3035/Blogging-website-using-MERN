import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Admin from './Pages/Admin'
import EditBlog from './components/EditBlog'
import ShowBlog from './Pages/ShowBlog'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/admin' element={<Admin />}/>
      <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
      <Route path="/:id" element={<ShowBlog />} />
    </Routes>
  )
}

export default App
