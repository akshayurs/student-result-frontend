import { Link } from 'react-router-dom'
import Details from '../components/Details'
function AdminDefault() {
  return (
    <div className="admin">
      <div className="container">
        <Details />
        <div className="row">
          <div className="col">
            <Link to="/adduser">Add User</Link>
            <Link to="/removeuser">Remove User</Link>
          </div>
          <div className="col">
            <Link to="/publish">Publish Result</Link>
            <Link to="/viewresultbyusn">View Result</Link>
          </div>
          <div className="col">
            <Link to="/listusers?type=student">View students</Link>
            <Link to="/listusers?type=teacher">View teachers</Link>
            <Link to="/listusers?type=admin">View admins</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDefault
