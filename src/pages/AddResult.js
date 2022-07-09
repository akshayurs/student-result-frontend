import { useState } from 'react'
import { fetchData } from '../Helpers/Fetch'

function AddResult() {
  const [usn, setUsn] = useState('')
  const [sem, setSem] = useState(1)
  return (
    <div className="addresult">
      <div className="title">Enter Student Details</div>
      <form>
        <label htmlFor="usn">USN</label>
        <input
          id="usn"
          type="text"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
        />
        <label htmlFor="sem">Sem</label>
        <input
          id="sem"
          type="number"
          value={sem}
          onChange={(e) => setSem(e.target.value)}
        />
        <button>submit</button>
      </form>
    </div>
  )
}

export default AddResult
