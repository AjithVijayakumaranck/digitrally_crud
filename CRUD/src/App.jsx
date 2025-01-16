import { RouterProvider } from 'react-router-dom'
import { routes } from './routers'

// GLOBALS
import './assets/css/global.css'
import './assets/css/table.scss'
import { ToastContainer } from 'react-toastify'
export default function App() { 
  return (
<>
<ToastContainer />
<RouterProvider router={routes}/>
</>
  )
}