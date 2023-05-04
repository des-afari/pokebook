import { useContext, useState } from 'react'
import '../static/css/listview.css'
import { AppContext,  } from '../App'
import Header from '../components/Header'
import Modal from '../components/Modal'


const ListView = () => {
  const {theme} = useContext(AppContext)
  const [parentToggle, setParentToggle] = useState(false)

  function handleToggle(toggle){
    setParentToggle(toggle)
  }

  return (
    <div className='listview'>
      <Header toggleState={handleToggle} />
      {parentToggle && < Modal parentToggle={parentToggle} />}
      <div className='listview_main'>
      </div>
    </div>
  )
}

export default ListView