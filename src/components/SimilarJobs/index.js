import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

function index(props) {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachJob
  return (
    <div className="similar-jobs-container">
      <div className="similar-card">
        <img className="similar-logo" src={companyLogoUrl} alt={title} />
        <div>
          <p>{title}</p>
          <p className="job-icon-position">
            <AiFillStar />
            {rating}
          </p>
        </div>
      </div>
      <h3>Discription</h3>
      <p>{jobDescription}</p>
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
    </div>
  )
}

export default index
