import { useContext, useEffect, useState } from 'react'
import '../static/css/listview.css'
import { ReactComponent as View } from '../assets/svg/view.svg'
import { AppContext } from '../App'
import Header from '../components/Header'
import axios from 'axios'
import ReactPaginate from 'react-paginate'


const ListView = () => {
  const {theme, theme_1, theme_2, theme_3} = useContext(AppContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [currentTheme, setCurrentTheme] = useState('')
  const [hoverCard, setHoverCard] = useState(null)

  const typeEmojis = {
    "normal": "🐻", "fire": "🔥", "water": "💧", "electric": "⚡️",
    "grass": "🍃", "ice": "❄️", "fighting": "🥊", "poison": "☠️",
    "ground": "🌍", "flying": "🕊️", "psychic": "🔮", "bug": "🐛",
    "rock": "🪨", "ghost": "👻", "dragon": "🐉", "dark": "🌑",
    "steel": "🔩", "fairy": "🧚"
  };

  useEffect(() => {
    const getPokemons = async () => {
      try{
        setLoading(true)
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
        const pokemons = response.data.results
        const details = await Promise.all(pokemons.map(async item => {
          const res = await axios.get(item.url)
          const {id, name, sprites, types } = res.data
          const img = sprites.other.dream_world.front_default
          const pokemonTypes = types.map(type => ({
            name: type.type.name,
            emoji: typeEmojis[type.type.name]
          }))

        return {id, name, img, pokemonTypes}
      } ))

      setData(details)
      setLoading(false)

      }catch(err){
        console.error(err)
        setLoading(false)
      }
    }

    getPokemons()
  }, [])

  useEffect(() => {
    if (theme === theme_1) {
      setCurrentTheme('theme_one')
    } else if (theme === theme_2) {
      setCurrentTheme('theme_two')
    } else if (theme === theme_3) {
      setCurrentTheme('theme_three')
    }
  }, [theme])

  const itemsPerPage = 8
  const pagesVisited = pageNumber * itemsPerPage

  const displayPokemons = data.slice(pagesVisited, pagesVisited + itemsPerPage).map(
    item => {
      return (
        <div key={item.id} className={`card ${hoverCard === item.id ? 'hovered' : ''}`}
             onMouseEnter={() => setHoverCard(item.id)}
             onMouseLeave={() => setHoverCard(null)}
        >
          <div>
            <img src={item.img} alt="image" />
          </div>
          <div>
            <p> {item.name} </p>
            <div className='types_container'>
              {item.pokemonTypes.map(type => (
                <span key={type.name}>
                    {type.emoji} {type.name}
                </span>
              ))
            }</div>
          </div>
          <button className='view_button' style={{background: theme, color: 'white'}} onClick={() => console.log('click')}>
            <span>View Pokemon</span>
            <span><View /></span>
          </button>
        </div>
      )
    }
  )

  const pageCount = Math.ceil(data.length/itemsPerPage)
  const pageChange = ({selected}) => {
    setPageNumber(selected)
  }

  return (
    <div className='listview'>
      <Header />
      <div className='listview_main'>
        {
          loading ? <p>Loading...</p> : <>
          <div className='list_main_container'>
            {displayPokemons}
          </div>
          <div className='pagination'>
          <ReactPaginate
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            previousLabel={'<'} nextLabel={'>'}
            pageCount={pageCount} onPageChange={pageChange}
            containerClassName='paginationBttns'
            activeClassName={currentTheme}
            />
          </div>
        </>
        }
      </div>
    </div>
  )
}

export default ListView