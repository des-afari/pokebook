import '../static/css/about.css';

const About = props => {
  const { detail } = props

  return (
    <div className="detail_var_main">
      <h1 className="detail_title">About</h1>
      {detail.map(item => (
        <div key={item.id} className="about_item">
          <div>
            <p>Height</p>
            <p className='data_detail'>{`${(item.height/10).toFixed(1)}m`}</p>
            <p>Weight</p>
            <p className='data_detail'> {`${(item.weight/10).toFixed(1)}kg`} </p>
            <p> Abilities </p>
            <p className='detail_abilites'> {item.abilityTypes.map(ability => (
              <li key={ability.name} className='data_detail'> {ability.name} </li>
            ))} </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
