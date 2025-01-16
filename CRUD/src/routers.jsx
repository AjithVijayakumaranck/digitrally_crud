import { createBrowserRouter } from 'react-router-dom'
import Customer from './pages/Customer'

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Customer/>
    }
])