import React from 'react'
import { getAllEmployee } from '../middleware/employee-api'
import Cookie from 'js-cookie'
import { useNavigate } from "react-router-dom"



function EmployeeList() {
  const navigate = useNavigate()

  const [employeeList, setEmployeeList] = React.useState([])
  const [searchText, setSearchText] = React.useState('')

  const getData = async () => {
    const result = await getAllEmployee();
    setEmployeeList(result)
  }

  React.useEffect(() => {
    if (Cookie.get('cid') == undefined) {
      navigate('/login')
    }
    getData()
  }, [])

  const searchHandler = () => {
    console.log(searchText)
  }

  // const changeHandler = (event) => {
  //   setSearchText(event.target.value)

  // }


  console.log(employeeList.length)

  return (
    <div>
      <div className='search-wrapper'>
          <input name='search' value={searchText} onChange={(event) => setSearchText(event.target.value)} />
          <button onClick={searchHandler}>Search</button>
      </div>
      <table>
        <tr>
          <th>Employee Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
        </tr>
        {
          employeeList.length > 0 && employeeList.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
            </tr>
          ))
        }

      </table>
    </div>

  )
}

export default EmployeeList