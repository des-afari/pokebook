import { useState, useContext, useEffect, useRef } from 'react'
import '../static/css/modal.css'
import { AppContext } from '../App'

const Modal = () => {
  const current_theme = localStorage.getItem('theme')
  const [selectedOption, setSelectedOption] = useState(current_theme || '#E85382' );
  const {setTheme} = useContext(AppContext)
  const modalRef = useRef()

  useEffect(() => {
    setTheme(selectedOption)
  }, [selectedOption])

  // const handlClickOutside = () => {
  //   localStorage.setItem('theme', selectedOption)
  // }

  document.addEventListener('click', e => {
    console.log(e.target)
    console.log(modalRef.current)
  })

  return (
    <div className='modal' ref={modalRef}>
      <div className='modal_main'>
        <div>
          <h2>Choose Theme</h2>
        </div>
        <div>
          <span
            style={{background: '#E85382'}}
            onClick={() => setSelectedOption('#E85382')}
            />
          <span
            value='blue'
            style={{background: '#39BADF'}}
            onClick={() => setSelectedOption('#39BADF')}
            />
          <span
            style={{background: '#E1A725'}}
            onClick={() => {
              setSelectedOption('#E1A725')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Modal