import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../App'
import { ReactComponent as Pokemon } from '../assets/svg/pokemon.svg'
import { ReactComponent as Search } from '../assets/svg/home_search.svg'
import '../static/css/homeview.css'

const HomeView = () => {
  const {theme} = useContext(AppContext)

  return (
    <div className='homeview'>
      <div className='homeview_main'>
        <div style={{width: "244px", height: "167px"}}>
          <Pokemon />
        </div>
        <h1>
          <span>Poké </span>
          <span style={{color: theme}}>book</span>
        </h1>
        <p>Largest Pokémon index with information about every Pokemon you can think of. </p>
        <div className='searchbar' style={{border: `6px solid ${theme}`}}>
          <input type="text" placeholder='Enter pokemon name' />
          <Link to='/list' style={{background: theme}}>
            <Search />
          </Link>
        </div>
        <Link to='/list' style={{color: 'black', fontWeight: '500'}}>View all</Link>
      </div>
    </div>
  )
}

export default HomeView