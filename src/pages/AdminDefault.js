import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ViewResult from '../components/ViewResult'
import { fetchData } from '../Helpers/Fetch'
function AdminDefault() {
  const [details, setDetails] = useState({ name: '', usn: '', email: '' })
  useEffect(() => {
    ;(async () => {
      const { data } = await fetchData(
        process.env.REACT_APP_SERVER_URL + '/myDetails'
      )
      setDetails({
        usn: data.user.username,
        name: data.user.name,
        email: data.user.email,
      })
      console.log(data)
    })()
  }, [])
  return (
    <div className="admin">
      <div className="details">
        <div className="name">Name : {details.name}</div>
        <div className="usn">USN : {details.usn}</div>
        <div className="email">Email : {details.email}</div>
      </div>
      <div className="container">
        <Link to="/adduser">Add User</Link>
        <Link to="/removeuser">Remove User</Link>
        <Link to="/publish">Publish Result</Link>
        <Link to="/listusers?type=student">View students</Link>
        <Link to="/listusers?type=teacher">View teachers</Link>
        <Link to="/listusers?type=admin">View admins</Link>
        <ViewResult />
      </div>
    </div>
  )
}

export default AdminDefault
