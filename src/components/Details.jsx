import { forwardRef, useContext, useState, useEffect } from 'react'
import { ReactComponent as Back } from '../assets/svg/back.svg'
import { AppContext } from '../App';
import Stats from './Stats';
import About from './About';
import Similar from './Similar';
import '../static/css/details.css'

const Details = forwardRef((props, ref) => {
  const { detail } = props;
  const [route, setRoute] = useState('about')
  const {theme} = useContext(AppContext)

  useEffect(() => {
    const modalMain = ref.current

    modalMain.addEventListener('click', e => {
      const dimensions = modalMain.getBoundingClientRect()
      if(
        e.clientX < dimensions.left ||
        e.clientX > dimensions.right ||
        e.clientY < dimensions.top ||
        e.clientY > dimensions.bottom
        ){
          modalMain.close()
        }
      })
    }, [])

  return (
    <dialog ref={ref} className='details_container'>
      {detail.map(item => (
        <div key={item.id}>
            <div className='detail_img_container' style={{background: theme}}>
              <button onClick={() => ref.current.close()}><Back /></button>
              <img src={item.img} alt="image" />
            </div>
            <div className='detail_type_container'>
              <p> {item.name} </p>
              <div className='types_container'>
                {item.pokemonTypes.map(type => (
                  <span key={type.name}>
                      {type.emoji} {type.name}
                  </span>
                ))
              }</div>
            </div>
            <div className='detail_main'>
              {route === 'about' && <About detail={detail} />}
              {route === 'stats' && <Stats detail={detail} />}
              {route === 'similar' && <Similar detail={detail} />}
            </div>
            <div className='detail_route'>
              <div className='det_routes'>
                <span className={route === 'about' ? "detail_pick" : ""} onClick={() => setRoute('about')}>About</span>
                <span className={route === 'stats' ? "detail_pick": ""} onClick={() => setRoute('stats')}>Stats</span>
                <span className={route === 'similar' ? "detail_pick": ""} onClick={() => setRoute('similar')}>Similar</span>
              </div>
            </div>
        </div>
      ))}

    </dialog>
  )
})

Details.displayName = 'Details';

export default Details

