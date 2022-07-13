import { Link } from 'react-router-dom'
import Details from '../components/Details'

function TeacherDefalut() {
  return (
    <div className="teacher">
      <div className="container">
        <Details />
        <Link to="/viewresultbyusn">View Result</Link>
        <Link to="/addresult">Add Result</Link>
      </div>
    </div>
  )
}

export default TeacherDefalut
