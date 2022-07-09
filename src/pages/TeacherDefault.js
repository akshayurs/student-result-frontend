import { Link } from 'react-router-dom'
import Details from '../components/Details'
import ViewResult from '../components/ViewResult'

function TeacherDefalut() {
  return (
    <div className="teacher">
      <Details />
      <div className="container">
        <ViewResult />
        <Link to="/addresult">Add Result</Link>
      </div>
    </div>
  )
}

export default TeacherDefalut
