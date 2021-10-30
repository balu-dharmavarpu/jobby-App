import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLogOutSharp} from 'react-icons/io5'
import './index.css'

function Index(props) {
  const onLogoutClicked = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  return (
    <div className="header-mainContainer">
      <div className="header-container">
        <img
          className="header-image"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <ul className="header-navItems">
          <Link to="/" className="header-item">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="header-item">
            <li>Jobs</li>
          </Link>
        </ul>
        <ul className="header-sm-navItems">
          <Link to="/" className="header-item">
            <li>
              <AiFillHome className="sm-icon-styles" />
            </li>
          </Link>
          <Link to="/jobs" className="header-item">
            <li>
              <BsFillBriefcaseFill className="sm-icon-styles" />
            </li>
          </Link>
          <button
            type="button"
            className="header-sm-logout"
            onClick={onLogoutClicked}
          >
            <IoLogOutSharp className="sm-icon-styles" />
          </button>
        </ul>
        <button
          type="button"
          className="header-logout"
          onClick={onLogoutClicked}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Index)
