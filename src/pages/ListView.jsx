import { useContext, useEffect, useState, useRef } from 'react'
import { ReactComponent as View } from '../assets/svg/view.svg'
import { AppContext } from '../App'
import axios from 'axios'
import Header from '../components/Header'
import Details from '../components/Details'
import Pagination from '../components/Pagination'
import { FadeLoader } from 'react-spinners'
import '../static/css/list_view_main.css'
import '../static/css/card.css'


const ListView = () => {
  const {theme} = useContext(AppContext)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [pageNum, setPageNum] = useState('8')
  const [filteredData, setFilteredData] = useState([])
  const detailRef = useRef(null)

  const itemsPerPage  = Number(pageNum)
  const pagesVisited = pageNumber * itemsPerPage
  const pageCount = Math.ceil(data.length/itemsPerPage)

  const typeEmojis = {
    "normal": "🐻", "fire": "🔥", "water": "💧", "electric": "⚡️",
    "grass": "🍃", "ice": "❄️", "fighting": "🥊", "poison": "☠️",
    "ground": "🌍", "flying": "🕊️", "psychic": "🔮", "bug": "🐛",
    "rock": "🪨", "ghost": "👻", "dragon": "🐉", "dark": "🌑",
    "steel": "🔩", "fairy": "🧚"
  }

  const pageChange = ({selected}) => {
    setPageNumber(selected)
  }

  useEffect(() => {
    const getPokemons = async () => {
      setIsLoading(true)
      try{
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=400')
        const pokemons = response.data.results

        const details = await Promise.all(pokemons.map(async item => {
          const res = await axios.get(item.url)
          const {id, name, sprites, types, height, weight, abilities, stats } = res.data

          const img = sprites.other.dream_world.front_default

          const pokemonTypes = types.map(type => ({
            name: type.type.name,
            emoji: typeEmojis[type.type.name]
          }))

          const abilityTypes = abilities.map(ability => ({
            name: ability.ability.name
          }))

          const statsTypes = stats.map(stat => ({
              name: stat.stat.name,
              base_stat: stat.base_stat
          }))

          return {id, name, img, height, weight, pokemonTypes, abilityTypes, statsTypes}
        } ))

        setData(details)
        setIsLoading(false)

      }catch(err){
          console.error(err)
          setIsLoading(false)
        }
    }

    getPokemons()
  }, [])


  const displayPokemons = data.slice(pagesVisited, pagesVisited + itemsPerPage).map(
    item => {
      const isHovered = item.id === hoveredCardId;
      return (
        <div key={item.id} id={item.id}
             className={`card ${isHovered ? "card-hovered" : ""}`}
             onMouseEnter={() => setHoveredCardId(item.id)}
             onMouseLeave={() => setHoveredCardId(null)}
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
            <button className={`button_hidden ${isHovered ? "button-show" : ""}`} style={{background: theme}}
              onClick={e => {
                const parentId = e.currentTarget.parentElement.id
                setFilteredData(data.filter(item => item.id === Number(parentId)))
                detailRef.current.showModal()
              }}
            >
              <span>View Pokemon</span>
              <View />
            </button>
        </div>
      )
    }
  )

  return (
    <div className='listview'>
      <Header />
      <div className='listview_main'>
        {
          isLoading ? <div className='loader_container'> <FadeLoader  /> </div> :
        <>
          <div className='list_main_container'>
            {displayPokemons}
          </div>
        </>
        }
        <Pagination pageCount={pageCount} pageChange={pageChange} setPageNum={setPageNum} />
        <Details detail={filteredData} ref={detailRef}  />
      </div>
    </div>
  )
}

export default ListView