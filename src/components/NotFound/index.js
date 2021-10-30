import Header from '../Header'
import './index.css'

function index() {
  return (
    <div>
      <Header />
      <div className="not-found">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
        />
        <h1>Page Not Found</h1>
        <p>We're sorry,page you requested could not be found</p>
      </div>
    </div>
  )
}

export default index
