import { useState, useEffect, useContext } from 'react'
import ReactPaginate from 'react-paginate'
import { AppContext } from '../App'
import '../static/css/pagination.css'

const Pagination = props => {
  const {pageCount, setPageNum, pageChange} = props
  const [currentTheme, setCurrentTheme] = useState('')
  const {theme, theme_1, theme_2, theme_3} = useContext(AppContext)


  useEffect(() => {
    if (theme === theme_1) {
      setCurrentTheme('theme_one')
    } else if (theme === theme_2) {
      setCurrentTheme('theme_two')
    } else if (theme === theme_3) {
      setCurrentTheme('theme_three')
    }
  }, [theme])

  return (
    <div className='pagination'>
      <ReactPaginate
        pageRangeDisplayed={4}
        marginPagesDisplayed={0}
        previousLabel={'<'} nextLabel={'>'}
        pageCount={pageCount} onPageChange={pageChange}
        containerClassName='pagination_bttns'
        activeClassName={currentTheme}
        />
        <select name="page-size" id="page-size" onChange={e => setPageNum(e.target.value)}>
          <option value="8">8</option>
          <option value="12">12</option>
          <option value="16">16</option>
          <option value="24">24</option>
        </select>
    </div>
  )
}

export default Pagination