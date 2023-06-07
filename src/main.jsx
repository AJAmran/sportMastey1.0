import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes/Routes.jsx'
import AuthProvider from './contexts/AuthProvider'
import 'react-responsive-carousel/lib/styles/carousel.min.css';





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
