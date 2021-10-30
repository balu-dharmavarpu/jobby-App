import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    profileData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getprofileData()
  }

  onUpdatedProfile = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  getprofileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.onUpdatedProfile(data.profile_details)
      this.setState({
        profileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getprofileData()
  }

  renderProfileView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile img" />
        <h2>{name}</h2>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-view">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="loader-view">
      <button type="button" className="header-logout" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderProfile()}</div>
  }
}
export default Profile
