import '../static/css/similar.css'

const Similar = props => {
  const {detail} = props

  return (
    <div className="detail_stat_main">
      <h1 className="detail_title">Similar</h1>
      {
        detail.map(item => (
        <div key={item.id}  className='similar_details'>
          <div className='similar_data'>
            <div>
                <img src={item.img} alt="image" />
            </div>
            <p> {item.name} </p>
          </div>
          <div className='similar_data'>
            <div>
                <img src={item.img} alt="image" />
            </div>
            <p> {item.name} </p>
          </div>
      </div>
        ))
      }
    </div>
  )
}

export default Similar