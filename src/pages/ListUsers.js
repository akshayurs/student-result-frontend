import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchData } from '../Helpers/Fetch'

function ListUsers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [users, setUsers] = useState([])
  const userType = searchParams.get('type')
  useEffect(() => {
    ;(async () => {
      const { data } = await fetchData(
        process.env.REACT_APP_SERVER_URL + `/listusers?type=${userType}`
      )
      if (data.success) {
        console.log(data)
        setUsers(data.users)
      }
    })()
  }, [searchParams])
  return (
    <div className="listusers">
      <Link to="/adduser">Add User</Link>
      <table>
        <tr>
          <th>name</th>
          <th>username</th>
          <th>email</th>
          <th></th>
        </tr>
        {users.map((item) => (
          <tr>
            <td>{item.name}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>
              <button
                onClick={async () => {
                  const { data } = await fetchData(
                    process.env.REACT_APP_SERVER_URL + '/removeuser',
                    'POST',
                    {
                      username: item.username,
                    }
                  )

                  if (data.success) {
                    toast.success('User Account Deleted Successfully')
                  } else {
                    toast.error(data.message)
                  }
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default ListUsers
