import { useContext, useRef, useEffect } from 'react'
import { AppContext } from '../App'
import '../static/css/header.css'
import '../static/css/modal.css'
import { ReactComponent as Pokemon } from '../assets/svg/pokemon.svg'
import { ReactComponent as Search } from '../assets/svg/list_search.svg'

const Header = () => {
  const {theme_1, theme_2, theme_3, theme, setTheme} = useContext(AppContext)
  const modal = useRef(null)

  useEffect(() => {
  const modalMain = modal.current

  modalMain.addEventListener('click', e => {
    const dimensions = modalMain.getBoundingClientRect()
    if(
      e.clientX < dimensions.left ||
      e.clientX > dimensions.right ||
      e.clientY < dimensions.top ||
      e.clientY > dimensions.bottom
      ){
        localStorage.setItem('pokebook_theme', theme)
        modalMain.close()
      }
    })
  }, [theme])

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
          <button style={{background: theme}} onClick={() => modal.current.showModal()}></button>
        </div>
      </div>

      {/* Modal */}
      <dialog ref={modal} className='modal'>
        <div className='modal_title'>
          <h2>Choose Theme</h2>
        </div>
        <div className='modal_content'>
          <span style={{background: theme_1}} onClick={() => setTheme(theme_1)} />
          <span style={{background: theme_2}} onClick={() => setTheme(theme_2)} />
          <span style={{background: theme_3}} onClick={() => setTheme(theme_3)} />
        </div>
      </dialog>
    </header>
  )
}

export default Header

