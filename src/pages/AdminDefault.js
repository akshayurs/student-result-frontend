import { Link } from 'react-router-dom'
import Details from '../components/Details'
import ViewResult from '../components/ViewResult'
function AdminDefault() {
  return (
    <div className="admin">
      <div className="container">
        <Details />
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
