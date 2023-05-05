import { useState, useContext, useEffect, useRef } from 'react'
import '../static/css/modal.css'
import { AppContext } from '../App'

const Modal = () => {
  const current_theme = localStorage.getItem('theme')
  const [selectedOption, setSelectedOption] = useState(current_theme || '#E85382' );
  const {setTheme} = useContext(AppContext)
  const modalRef = useRef(null)
  const modalMain = useRef(null)

  useEffect(() => {
    setTheme(selectedOption)
  }, [selectedOption])


  useEffect(() => {
    const handleClickOutside = e => {
      if (
        !modalMain.current.contains(e.target) &&
        modalRef.current !== e.target
      ){
        console.log('Yes');
      } else{
        console.log('Yes');
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
  }, [])


  return (
    <div className='modal' ref={modalRef}>
      
    </div>
  )
}

export default Modal