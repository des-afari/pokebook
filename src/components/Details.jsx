import { forwardRef, useContext, useState } from 'react'
import { ReactComponent as Back } from '../assets/svg/back.svg'
import '../static/css/details.css'
import { AppContext } from '../App';
import Stats from './Stats';
import About from './About';
import Similar from './Similar';

const Details = forwardRef((props, ref) => {
  const { detail } = props;
  const [route, setRoute] = useState('about')
  const { theme } = useContext(AppContext)
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
              {route === 'about' && <About data={detail} />}
              {route === 'stats' && <Stats data={detail} />}
              {route === 'similar' && <Similar data={detail} />}
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

