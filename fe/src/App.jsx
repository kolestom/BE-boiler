import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from '../pages/RootLayout'
import LoginPage from '../pages/LoginPage'
import CallbackPage from '../pages/CallbackPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        // path: 'login',
        index: true,
        element: <LoginPage/>
      },
      {
        path: 'callback',
        element: <CallbackPage/>
      }
    ]
  }
])

function App() {
  

  return (
    <RouterProvider router={router}/>
  )
}

export default App