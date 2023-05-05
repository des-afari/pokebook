import { useContext, useEffect, useState } from 'react'
import '../static/css/listview.css'
import { AppContext } from '../App'
import Header from '../components/Header'
import axios from 'axios'


const ListView = () => {
  const {theme} = useContext(AppContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const typeEmojis = {
    "normal": "🐻",
    "fire": "🔥",
    "water": "💧",
    "electric": "⚡️",
    "grass": "🍃",
    "ice": "❄️",
    "fighting": "🥊",
    "poison": "☠️",
    "ground": "🌍",
    "flying": "🕊️",
    "psychic": "🔮",
    "bug": "🐛",
    "rock": "🪨",
    "ghost": "👻",
    "dragon": "🐉",
    "dark": "🌑",
    "steel": "🔩",
    "fairy": "🧚"
  };

  useEffect(() => {
    const getPokemons = async () => {
      try{
        setLoading(true)
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=8')
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

  return (
    <div className='listview'>
      <Header />
      <div className='listview_main'>
          {
            loading ? <p>loading...</p> : <div className='list_main_container'>
              {data.map(item => (
                <div key={item.id} className='card'>
                  <div>
                    <img src={item.img} alt="image" />
                  </div>
                  <div>
                    <p> {item.name} </p>
                    <div className='types_container'>
                      {item.pokemonTypes.map(type => (
                        <span key={type.name}>
                            {type.emoji}
                            {type.name}
                        </span>
                      ))
                    }</div>
                  </div>
                </div>
              ))}
            </div>
          }
        <div className='pagination'></div>
      </div>
    </div>
  )
}

export default ListView