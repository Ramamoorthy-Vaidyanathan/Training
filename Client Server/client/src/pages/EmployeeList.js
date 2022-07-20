import React from 'react'
import { getAllEmployee } from '../middleware/employee-api'
import Cookie from 'js-cookie'
import { useNavigate } from "react-router-dom"



function EmployeeList() {
  const navigate = useNavigate()

  const [employeeList, setEmployeeList] = React.useState([])
  const [searchText, setSearchText] = React.useState('')

  const getData = async (param) => {
    const result = await getAllEmployee(param);
    setEmployeeList(result)
  }

  React.useEffect(() => {
    if (Cookie.get('cid') == undefined) {
      navigate('/login')
    }
    getData('')
  }, [])

  const searchHandler = () => {
    console.log(searchText)
    getData(searchText)
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
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>{employee._source.first_name}</td>
              <td>{employee._source.last_name}</td>
              <td>{employee._source.email}</td>
              <td>{employee._source.gender}</td>
            </tr>
          ))
        }

      </table>
    </div>

  )
}

export default EmployeeList