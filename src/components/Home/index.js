import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

function index() {
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="title">
            Find The Job That <br /> Fits Your Life
          </h1>
          <p>
            Millions of paople are searching for jobs,salary information,company
            reviews.Find the job that fits your abilites and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="findJob-btn">
              Find Jobs
            </button>
          </Link>
        </div>
        <img
          className="home-bg-img"
          src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
          alt="website logo"
        />
        <img
          className="home-sm-img"
          src="https://assets.ccbp.in/frontend/react-js/home-sm-bg.png"
          alt="website logo"
        />
      </div>
    </div>
  )
}

export default index
