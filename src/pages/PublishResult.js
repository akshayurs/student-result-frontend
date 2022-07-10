import { useState } from 'react'
import { toast } from 'react-toastify'
import { fetchData } from '../Helpers/Fetch'
import Loading from '../Helpers/LoadingScreen'

function PublishResult() {
  const [sem, setSem] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState({ loading: false, text: '' })

  return (
    <div className="publish">
      <Loading loading={loading.loading} />
      <div className="container">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            setLoading({ loading: true })
            const { data } = await fetchData(
              process.env.REACT_APP_SERVER_URL +
                `/publishresult?sem=${sem}&year=${year}`
            )
            setLoading({ loading: false })
            if (data.success && data.result.modifiedCount > 0) {
              toast.success('Results Published Successfully')
            } else if (data.success && data.result.matchedCount <= 0) {
              toast.info('No such result found')
            } else if (data.success && data.result.modifiedCount <= 0) {
              toast.info('Result already Published')
            } else {
              toast.error('Error: ' + data.message)
            }
          }}
        >
          <label htmlFor="sem">Semester</label>
          <input
            type="number"
            value={sem}
            id="sem"
            onChange={(e) => setSem(e.target.value)}
          />
          <label htmlFor="year">Year</label>
          <input
            type="text"
            value={year}
            id={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default PublishResult
