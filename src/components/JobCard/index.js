import {Link} from 'react-router-dom'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill, BsFillStarFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li>
        <div className="job-card-container">
          <div className="logo-title-rating-container">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="company logo"
            />
            <div className="title-rating-container">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="star-image" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-package-container">
            <div className="location-type-container">
              <div className="location-container">
                <GoLocation />
                <p>{location}</p>
              </div>
              <div className="employment-type-container">
                <BsFillBriefcaseFill />
                <p className="employment-type">{employmentType}</p>
              </div>
            </div>

            <p>{packagePerAnnum}</p>
          </div>
          <hr className="separator" />
          <div>
            <h1 className="description">Description</h1>
            <p className="description">{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
