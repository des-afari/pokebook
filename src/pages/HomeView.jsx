import { useContext } from 'react'
import '../static/css/homeview.css'
import { ReactComponent as Pokemon } from '../assets/svg/pokemon.svg'
import { ReactComponent as Search } from '../assets/svg/search.svg'
import { AppContext } from '../App'
import { Link } from 'react-router-dom'



const HomeView = () => {
  const {theme} = useContext(AppContext)
  return (
    <div className='homeview'>
      <div className='homeview_main'>
        <Pokemon />
        <h1>
          <span>Poké </span>
          <span style={{color: theme}}>book</span>
        </h1>
        <p>Largest Pokémon index with information about every Pokemon you can think of. </p>
        <div className='searchbar' style={{border: `6px solid ${theme}`}}>
          <input type="text" placeholder='Enter pokemon name' />
          <Link to='/listview' style={{background: theme}}>
            <Search />
          </Link>
        </div>
        <Link to='/listview' style={{color: 'black', fontWeight: '500'}}>View all</Link>
      </div>
    </div>
  )
}

export default HomeView