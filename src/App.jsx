import { createContext, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeView from './pages/HomeView'
import ListView from './pages/ListView'

export const AppContext = createContext()

const App = () => {

  const theme_1 = '#E85382'
  const theme_2 = '#39BADF'
  const theme_3 = '#E1A725'

  const current_theme = localStorage.getItem('pokebook_theme')
  const [theme, setTheme] = useState(current_theme || theme_1)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeView />
    },
    {
      path: '/pokemons',
      element: <ListView />
    }
  ])
  
  return (
    <AppContext.Provider value={{theme_1, theme_2, theme_3, theme, setTheme}}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}

export default App