import { forwardRef, useContext, useEffect } from 'react'
import '../static/css/theme_modal.css'
import { AppContext } from '../App'

const ThemeModal = forwardRef((props, ref) => {
  const {theme_1, theme_2, theme_3, setTheme, theme} = useContext(AppContext)

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
          localStorage.setItem('pokebook_theme', theme)
          modalMain.close()
        }
      })
    }, [theme])

  return (
    <dialog ref={ref} className='modal'>
      <div className='modal_title'>
          <h2>Choose Theme</h2>
        </div>
        <div className='modal_content'>
          <span style={{background: theme_1}} onClick={() => setTheme(theme_1)} />
          <span style={{background: theme_2}} onClick={() => setTheme(theme_2)} />
          <span style={{background: theme_3}} onClick={() => setTheme(theme_3)} />
        </div>
    </dialog>
  )
})

ThemeModal.displayName = 'ThemeModal'

export default ThemeModal