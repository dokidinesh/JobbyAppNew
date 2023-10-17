import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill, BsFillStarFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const jobDetails = fetchedData.job_details
      const similarJobs = fetchedData.similar_jobs

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills.map(skill => ({
          imageUrl: skill.image_url,
          name: skill.name,
        })),
        title: jobDetails.title,
      }

      const updatedSimilarJobs = similarJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        title: eachJob.title,
        rating: eachJob.rating,
      }))

      const updatedData = {
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
      }

      this.setState({
        jobItemDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSimilarJobs = () => {
    const {jobItemDetails} = this.state
    const {similarJobs} = jobItemDetails

    return (
      <div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(eachJob => (
            <li key={eachJob.id} className="similar-job-item">
              <div className="similar-job-logo-title-rating-container">
                <img
                  className="similar-company-logo"
                  src={eachJob.companyLogoUrl}
                  alt="similar job company logo"
                />
                <div className="similar-job-title-rating-container">
                  <h1 className="title-heading">{eachJob.title}</h1>
                  <div className="rating-container">
                    <BsFillStarFill className="star-image" />
                    <p>{eachJob.rating}</p>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="description">Description</h1>
                <p className="description">{eachJob.jobDescription}</p>
              </div>
              <div className="location-type-container">
                <div className="location-container">
                  <GoLocation />
                  <p>{eachJob.location}</p>
                </div>
                <div className="employment-type-container">
                  <BsFillBriefcaseFill />
                  <p>{eachJob.employmentType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {jobItemDetails} = this.state
    const {jobDetails} = jobItemDetails

    return (
      <div className="job-item-details-section">
        <div className="responsive-details-container">
          <div className="logo-title-rating-container">
            <img
              className="company-logo"
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title-rating-container">
              <h1 className="job-title">{jobDetails.title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="star-image" />
                <p>{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-package-container">
            <div className="location-type-container">
              <div className="location-container">
                <GoLocation />
                <p>{jobDetails.location}</p>
              </div>
              <div className="employment-type-container">
                <BsFillBriefcaseFill />
                <p>{jobDetails.employmentType}</p>
              </div>
            </div>

            <p>{jobDetails.packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <div className="description-web-url-container">
              <h1 className="description">Description</h1>
              <a className="web-link" href={jobDetails.companyWebsiteUrl}>
                Visit <FiExternalLink />
              </a>
            </div>
            <p className="description">{jobDetails.jobDescription}</p>
          </div>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {jobDetails.skills.map(skill => (
              <li key={skill.name}>
                <div className="skill-container">
                  <img
                    className="skill-image"
                    src={skill.imageUrl}
                    alt={skill.name}
                  />
                  <p className="skill-name">{skill.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-company-content">
              <p className="life-at-company-description">
                {jobDetails.lifeAtCompany.description}
              </p>
              <img
                src={jobDetails.lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">{this.renderSimilarJobs()}</div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="job-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobItemDetails()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderJobItemDetailsView = () => (
    <div>
      <Header />
      {this.renderJobDetails()}
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default JobItemDetails
