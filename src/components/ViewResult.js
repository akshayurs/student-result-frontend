import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ViewResult() {
  const [usn, setUsn] = useState('')
  const [sem, setSem] = useState('')
  const navigate = useNavigate()
  return (
    <div className="viewresult">
      <div className="title">View Result</div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          navigate(`/result?sem=${sem}&usn=${usn}`)
        }}
      >
        <input
          type="text"
          value={usn}
          required
          placeholder="USN"
          onChange={(e) => setUsn(e.target.value)}
        />
        <input
          type="number"
          value={sem}
          placeholder="Semester"
          onChange={(e) => setSem(e.target.value)}
        />
        <button>view</button>
      </form>
    </div>
  )
}

export default ViewResult
