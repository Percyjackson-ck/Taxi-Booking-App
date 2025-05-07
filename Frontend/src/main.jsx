import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UserContext from './context/UserContext.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CaptainConetxt from './context/CaptainContext.jsx'
createRoot(document.getElementById('root')).render(
    <CaptainConetxt>
    <UserContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </UserContext>
    </CaptainConetxt>
    
)
