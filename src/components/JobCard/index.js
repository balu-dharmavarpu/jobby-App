import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

function index(props) {
  const {job} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAannum,
    rating,
    title,
  } = job
  return (
    <Link to={`/jobs/${id}`} className="job-card">
      <div className="job-title-card">
        <img
          className="job-logo"
          src={companyLogoUrl}
          alt={`${companyLogoUrl}`}
        />
        <div>
          <h4 style={{lineHeight: 0}}>{title}</h4>
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
        <p>{packagePerAannum}</p>
      </div>
      <hr />
      <div>
        <h4 style={{lineHeight: 0}}>Discription</h4>
        <p className="job-discription">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default index
