import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetails: [],
    skills: [],
    lifeAtCompany: [],
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getUpdatedJobDetails = job => ({
    companyLogoUrl: job.company_logo_url,
    companyWebsiteUrl: job.company_website_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    title: job.title,
    rating: job.rating,
  })

  getLifeAtCompany = job => ({
    description: job.description,
    imageUrl: job.image_url,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data.job_details, 'data')
      const updatedJobDetails = this.getUpdatedJobDetails(data.job_details)
      const updatedLifeAndCompany = this.getLifeAtCompany(
        data.job_details.life_at_company,
      )
      const updatedSKills = data.job_details.skills.map(job => ({
        imageUrl: job.image_url,
        name: job.name,
      }))
      const updatedSimilarJobs = data.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobDetails: updatedJobDetails,
        lifeAtCompany: updatedLifeAndCompany,
        skills: updatedSKills,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLifeAtCompany = () => {
    const {lifeAtCompany} = this.state
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="life-container">
        <p className="job-discription">{description}</p>
        <img src={imageUrl} alt="life at company" />
      </div>
    )
  }

  renderSkilsView = () => {
    const {skills} = this.state
    return (
      <div className="skill">
        {skills.map(skill => (
          <div className="skill-container">
            <img
              className="skill-logo"
              src={skill.imageUrl}
              alt={`${skill.name}`}
            />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    )
  }

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      title,
      rating,
    } = jobDetails
    return (
      <div className="jobDetails-container">
        <div className="job-card">
          <div className="job-title-card">
            <img className="job-logo" src={companyLogoUrl} alt={`${title}`} />
            <div>
              <h2 style={{lineHeight: 0}}>{title}</h2>
              <p className="job-icon-position">
                <AiFillStar style={{color: '#fbbf24'}} />
                {rating}
              </p>
            </div>
          </div>
          <div className="job-loctaion">
            <div className="job-loctaion">
              <div>
                <p className="job-icon-position">
                  <MdLocationOn />
                  {location}
                </p>
              </div>
              <div className="job-intern">
                <p className="job-icon-position">
                  <BsFillBriefcaseFill />
                  {employmentType}
                </p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <div className="job-loctaion">
              <h2 style={{lineHeight: 0}}>Discription</h2>
              <a className="visit-link" href={companyWebsiteUrl}>
                Visit
                <BiLinkExternal />
              </a>
            </div>
            <p className="job-discription">{jobDescription}</p>
          </div>
          <div>
            <h2>Skills</h2>
            {this.renderSkilsView()}
          </div>
          <div>
            <h2>Life at Company</h2>
            {this.renderLifeAtCompany()}
          </div>
        </div>
        <h2 style={{width: '90%'}}>Similar Jobs</h2>
        <div className="similar-jobs">
          {similarJobs.map(eachJob => (
            <SimilarJobs key={eachJob.id} eachJob={eachJob} />
          ))}
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-styles" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="loader-styles">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="header-logout">
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobDetails-mainContainer">
        <Header />
        {this.renderJobDetailsView()}
      </div>
    )
  }
}
export default JobDetails
