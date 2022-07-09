import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Details from '../components/Details'

function StudentDefault() {

  return (
    <div className="student">
      <Details />
      <div className="container">
        <div className="title">View Result</div>
        <div className="links">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <Link to={`/result?sem=${item}`}> sem-{item} </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudentDefault
