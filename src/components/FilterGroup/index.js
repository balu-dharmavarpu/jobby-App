import {Component} from 'react'
import Profile from '../Profile'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FilterGroup extends Component {
  onChecked = e => {
    const {checkedData} = this.props
    checkedData(e.target.value)
  }

  onSelectSalary = e => {
    const {onSalarySelected} = this.props
    onSalarySelected(e.target.value)
  }

  render() {
    return (
      <div className="filter-container">
        <Profile />
        <hr />
        <div>
          <h4>Type of Employement</h4>
          {employmentTypesList.map(employement => (
            <div>
              <input
                type="checkbox"
                id={employement.employmentTypeId}
                name={employement.employmentTypeId}
                onChange={this.onChecked}
                value={employement.employmentTypeId}
              />
              <label htmlFor={employement.id}>{employement.label}</label>
              <br />
              <br />
            </div>
          ))}
        </div>
        <hr />
        <div>
          <h4>Salary Range</h4>
          {salaryRangesList.map(salary => (
            <div>
              <input
                type="radio"
                id={salary.salaryRangeId}
                name="salary"
                value={salary.salaryRangeId}
                onChange={this.onSelectSalary}
              />
              <label htmlFor={salary.salaryRangeId}>{salary.label}</label>
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default FilterGroup
