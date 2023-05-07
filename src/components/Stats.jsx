import { useContext } from 'react'
import '../static/css/stats.css'
import { AppContext } from '../App'

const Stats = props => {
  const { detail } = props
  const {theme} = useContext(AppContext)


  return (
    <div className="detail_stat_main">
      <h1 className="detail_title">Stats</h1>
      {detail.map(item => (
        <div key={item.id} className='stat_container'>
          <div>
            {item.statsTypes.map(stat => (
              <div key={stat.name} className='stat_main_container'>
                <span className='stat_name'> {stat.name} </span>
                <div className='stat_percentage_container'>
                  <div className='stat_percentage' style={{width: `${stat.base_stat}%`, background: theme}} ></div>
                </div>
                <span className='stat_value'> {stat.base_stat} </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Stats