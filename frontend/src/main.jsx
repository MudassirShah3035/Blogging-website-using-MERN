import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './contexts/AuthContext.jsx'
import PostContext from './contexts/PostContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <PostContext>
        <App />
      </PostContext>
    </AuthContext>
  </BrowserRouter>
)
