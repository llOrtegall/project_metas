import { AuthProvider } from './auth/AuthContext.tsx'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterMain } from './routes/index.tsx'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_URL_API
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={RouterMain} />
  </AuthProvider>
)
