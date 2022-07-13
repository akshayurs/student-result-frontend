import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Details from '../components/Details'

function StudentDefault() {
  return (
    <div className="student">
      <div className="container">
        <Details />
        <div className="title">View Result</div>
        <div className="links">
          {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map(
            (item, index) => (
              <Link to={`/result?sem=${index + 1}`}>{item} sem </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentDefault
