import { useContext } from 'react'
import '../static/css/not_found.css'
import { AppContext } from '../App'

const NotFound = () => {
  const {theme} = useContext(AppContext)
  return (
    <div className='not_found'>
        <h1>404</h1>
        <p style={{color: theme}}>page not found</p>
    </div>
  )
}

export default NotFound