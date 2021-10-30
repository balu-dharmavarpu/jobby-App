import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'
import FilterGroup from '../FilterGroup'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsData: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentOpt: [],
    selectedOpt: '',
  }

  componentDidMount = () => {
    this.getJobsData()
  }

  checkedData = val => {
    const {employmentOpt} = this.state
    if (employmentOpt.includes(val)) {
      const res = employmentOpt.filter(employee => employee !== val)
      this.setState({employmentOpt: res}, this.getJobsData)
    } else {
      this.setState(
        prevState => ({
          employmentOpt: [...prevState.employmentOpt, val],
        }),
        this.getJobsData,
      )
    }
  }

  onSalarySelected = salaryId => {
    this.setState({selectedOpt: salaryId}, this.getJobsData)
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, employmentOpt, selectedOpt} = this.state
    const JwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentOpt}&minimum_package=${selectedOpt}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAannum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getJobsData()
  }

  renderJobsView = () => {
    const {jobsData, searchInput, employmentOpt} = this.state
    console.log(employmentOpt, 'opt')
    return (
      <div>
        <div className="search-container">
          <input
            className="search-input"
            type="search"
            value={searchInput}
            onChange={this.onSearchInput}
          />
          <button
            type="button"
            className="search-btn"
            onClick={this.onEnterSearch}
          >
            <AiOutlineSearch style={{fontSize: '20px'}} />
          </button>
        </div>
        <div div className="jobs-container">
          {jobsData.length !== 0 ? (
            jobsData.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="no-jobs">
              <img
                className="no-jobs-img"
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
              />
              <h2>No Jobs Found</h2>
              <p>We could not find any jobs,Try other filters.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearch = () => {
    this.getJobsData()
  }

  renderLoadingView = () => (
    <div className="loader-styles">
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
      <button type="button" className="header-logout" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsView()
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
      <div className="jobs-mainContainer">
        <Header />
        <Container maxWidth="xl" style={{marginTop: '20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <FilterGroup
                checkedData={this.checkedData}
                onSalarySelected={salaryId => this.onSalarySelected(salaryId)}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={9}>
              {this.renderAllJobs()}
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}
export default Jobs
