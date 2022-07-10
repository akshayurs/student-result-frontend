import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchData } from '../Helpers/Fetch'
import Loading from '../Helpers/LoadingScreen'

function ListUsers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState({ loading: false, text: '' })
  const [users, setUsers] = useState([])
  const userType = searchParams.get('type')
  const [temp, setTemp] = useState(0)
  useEffect(() => {
    ;(async () => {
      setLoading({ loading: true })
      console.log(searchParams + temp)
      const { data } = await fetchData(
        process.env.REACT_APP_SERVER_URL + `/listusers?type=${userType}`
      )
      setLoading({ loading: false })
      if (data.success && data.users.length === 0) {
        toast.info('No users found')
      }
      if (data.success) {
        setUsers(data.users)
      }
    })()
  }, [temp])
  return (
    <div className="listusers">
      <Loading loading={loading.loading} text={loading.text} />
      <table cellPadding="5px">
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
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
                    setTemp((prev) => prev + 1)
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
      <Link className="add" to="/adduser">
        Add User
      </Link>
    </div>
  )
}

export default ListUsers
