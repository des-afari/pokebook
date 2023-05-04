import { useContext, useState } from 'react'
import { AppContext } from '../App'
import '../static/css/header.css'
import { ReactComponent as Pokemon } from '../assets/svg/pokemon.svg'
import { ReactComponent as Search } from '../assets/svg/list_search.svg'

const Header = props => {
  const {theme} = useContext(AppContext)
  const [toggle, setToggle] = useState(true)

  const handleClick = () => {
    setToggle(!toggle)
    props.toggleState(toggle)
  }

  return (
    <header>
      <div>
        <div style={{width: '129.43px', height: '84px'}}>
          <Pokemon />
        </div>
        <h4>
          <span>Poke</span>
          <span style={{color: theme}}>book</span>
        </h4>
      </div>
      <div>
        <div>
          <Search />
          <input type="text" placeholder='Enter pokemon name' />
        </div>
      </div>
      <div>
        <div>
          <button style={{background: theme}} onClick={handleClick}></button>
        </div>
      </div>
    </header>
  )
}

export default Header

