import { createContext, useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomeView from './pages/HomeView'
import ListView from './pages/ListView'

export const AppContext = createContext()

const App = () => {

  const [theme, setTheme] = useState('#E85382')

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeView />
    },
    {
      path: '/listview',
      element: <ListView />
    }
  ])
  return (
    <AppContext.Provider value={{theme, setTheme}}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}

export default App