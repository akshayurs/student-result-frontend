import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { fetchData } from '../Helpers/Fetch'
import Loading from '../Helpers/LoadingScreen'

function Result() {
  const [searchParams, setSearchParams] = useSearchParams()
  const sem = searchParams.get('sem')
  const usn = searchParams.get('usn')
  const [result, setResult] = useState([])
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState({ loading: false, text: '' })

  useEffect(() => {
    if (sem === undefined || sem === null) return
    ;(async () => {
      setLoading({ loading: true })

      const { data } = await fetchData(
        process.env.REACT_APP_SERVER_URL +
          (!usn
            ? `/viewmyresult?sem=${sem}`
            : `/viewresultbyusn?sem=${sem}&usn=${usn}`)
      )
      setLoading({ loading: false })
      if (data.success) {
        setResult(data.result.result)
      } else {
        toast.error(data.message)
      }
      console.log(data)
    })()
  }, [sem])
  let sgpa = 0
  let total = 0
  let fail = false
  result.forEach((item) => {
    total += item.credit
    switch (item.grade) {
      case 'S':
        sgpa += 10 * item.credit
        break
      case 'A':
        sgpa += 9 * item.credit
        break
      case 'B':
        sgpa += 8 * item.credit
        break
      case 'C':
        sgpa += 7 * item.credit
        break
      case 'D':
        sgpa += 6 * item.credit
        break
      case 'E':
        sgpa += 5 * item.credit
        break
      default:
        if (item.grade !== 'pp') {
          fail = true
        }
    }
  })
  sgpa = sgpa / total
  sgpa *= 1000
  sgpa = parseInt(sgpa)
  sgpa /= 1000
  return (
    <div className="result">
      <Loading loading={loading.loading} />
      <table>
        <tr>
          <th>Subject Code</th>
          <th>Subject Title</th>
          <th>Credit</th>
          <th>Grade</th>
        </tr>
        {result.map((item) => (
          <tr>
            <td>{item.code}</td>
            <td>{item.subject}</td>
            <td>{item.credit}</td>
            <td>{item.grade}</td>
          </tr>
        ))}
      </table>
      <div className="sgpa">SGPA - {sgpa}</div>
    </div>
  )
}

export default Result
