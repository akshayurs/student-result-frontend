import { Link } from 'react-router-dom'
import Details from '../components/Details'
import ViewResult from '../components/ViewResult'

function TeacherDefalut() {
  return (
    <div className="teacher">
      <div className="container">
        <Details />
        <ViewResult />
        <Link to="/addresult" className="addresult">
          <button>Add Result</button>
        </Link>
      </div>
    </div>
  )
}

export default TeacherDefalut
