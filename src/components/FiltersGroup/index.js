import './index.css'

const FiltersGroup = props => {
  const renderSalaryRangesFiltersList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salaryRange => {
      const {changeSalaryRange} = props
      const onChangeSalaryRange = event => changeSalaryRange(event.target.value)
      return (
        <li key={salaryRange.salaryRangeId} className="list-item">
          <input
            className="filter-input"
            type="radio"
            id={salaryRange.salaryRangeId}
            name="salary range"
            onChange={onChangeSalaryRange}
            value={salaryRange.salaryRangeId}
          />
          <label htmlFor={salaryRange.salaryRangeId}>{salaryRange.label}</label>
        </li>
      )
    })
  }

  const renderSalaryRangeFilters = () => (
    <div>
      <h1 className="heading">Salary Range</h1>
      <ul className="list-container">{renderSalaryRangesFiltersList()}</ul>
    </div>
  )

  const renderEmploymentTypesFiltersList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(employmentType => {
      const {changeEmploymentType} = props

      const onClickEmploymentType = event => {
        const {value, checked} = event.target
        if (checked) {
          changeEmploymentType(value)
        }
      }

      return (
        <li key={employmentType.employmentTypeId} className="list-item">
          <input
            className="filter-input"
            type="checkbox"
            id={employmentType.employmentTypeId}
            onChange={onClickEmploymentType}
            value={employmentType.employmentTypeId}
          />
          <label htmlFor={employmentType.employmentTypeId}>
            {employmentType.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypesFilters = () => (
    <div>
      <h1 className="heading">Type of Employment</h1>
      <ul className="list-container">{renderEmploymentTypesFiltersList()}</ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      <hr className="separator" />
      {renderSalaryRangeFilters()}

      <hr className="separator" />

      {renderEmploymentTypesFilters()}
    </div>
  )
}

export default FiltersGroup
