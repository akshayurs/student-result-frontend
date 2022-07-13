import { useState } from 'react'
import { fetchData } from '../Helpers/Fetch'
import { toast } from 'react-toastify'
import Loading from '../Helpers/LoadingScreen'
function removeVal(arr, obj) {
  return arr.filter((item) => {
    return !(
      item.code === obj.code &&
      obj.title === item.title &&
      obj.grade === item.grade &&
      obj.credit === item.credit
    )
  })
}
function AddResult() {
  const [usn, setUsn] = useState('')
  const [sem, setSem] = useState(1)
  const [year, setYear] = useState('')
  const [name, setName] = useState('')
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState({ loading: false })
  const [userFound, setUserFound] = useState(false)
  const [resultTemp, setResultTemp] = useState({
    title: '',
    code: '',
    grade: '',
    credit: 0,
  })

  return (
    <div className="addresult">
      <Loading loading={loading.loading} />
      {!userFound && (
        <form
          className="container-top"
          onSubmit={async (e) => {
            e.preventDefault()
            setLoading({ loading: true })
            const { data: user } = await fetchData(
              process.env.REACT_APP_SERVER_URL + `/getdetails?usn=${usn}`
            )
            if (!user.success || user.user.userType !== 'student') {
              toast.error('Student Not Found')
              setLoading({ loading: false })
              return
            }
            setUserFound(true)
            setName(user.user.name)

            const { data } = await fetchData(
              process.env.REACT_APP_SERVER_URL +
                `/viewresultbyusn?usn=${usn}&sem=${sem}`
            )
            console.log(data)
            setLoading({ loading: false })
            if (!data.success) {
              toast.info('Results are not updated')
              return
            }
            setResult(data.result.result)
          }}
        >
          <div className="title">Enter Student Details</div>

          <label htmlFor="usn">USN</label>
          <input
            id="usn"
            type="text"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            required
          />
          <label htmlFor="sem">Sem</label>
          <input
            id="sem"
            type="number"
            value={sem}
            min="1"
            max="8"
            onChange={(e) => setSem(e.target.value)}
          />
          <label htmlFor="year">Year</label>
          <input
            id="year"
            type="text"
            value={year}
            required
            onChange={(e) => setYear(e.target.value)}
          />
          <button>submit</button>
        </form>
      )}
      {userFound && (
        <div className="result">
          <div className="details">
            <div className="name">Name: {name}</div>
            <div className="usn">USN : {usn}</div>
            <div className="sem">Sem : {sem}</div>
          </div>
          <table>
            <tr>
              <th>Subject Code</th>
              <th>Subject Title</th>
              <th>Credit</th>
              <th>Grade</th>
              <th></th>
            </tr>
            {result.map((item, index) => (
              <tr>
                <td>{item.code}</td>
                <td>{item.title}</td>
                <td>{item.credit}</td>
                <td>{item.grade}</td>
                <td>
                  <button
                    onClick={() => {
                      setResult((prev) => removeVal(prev, item))
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr className="last">
              <td>
                <input
                  type="text"
                  value={resultTemp.code}
                  onChange={(e) =>
                    setResultTemp((prev) => {
                      return { ...prev, code: e.target.value.toUpperCase() }
                    })
                  }
                  placeholder="Code"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={resultTemp.title}
                  onChange={(e) =>
                    setResultTemp((prev) => {
                      return { ...prev, title: e.target.value }
                    })
                  }
                  placeholder="title"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={resultTemp.credit}
                  onChange={(e) =>
                    setResultTemp((prev) => {
                      return { ...prev, credit: e.target.value }
                    })
                  }
                  placeholder="credit"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={resultTemp.grade}
                  onChange={(e) =>
                    setResultTemp((prev) => {
                      return {
                        ...prev,
                        grade: e.target.value.toUpperCase().charAt(0),
                      }
                    })
                  }
                  placeholder="Grade"
                />
              </td>
              <td>
                <button
                  className="add"
                  onClick={() => {
                    if (
                      resultTemp.code.trim() === '' ||
                      resultTemp.title.trim() === '' ||
                      resultTemp.grade.trim() === ''
                    )
                      return
                    setResult((prev) => [...prev, resultTemp])
                    setResultTemp({
                      title: '',
                      code: '',
                      grade: '',
                      credit: 0,
                    })
                  }}
                >
                  Add
                </button>
              </td>
            </tr>
          </table>
          <div className="update">
            <button
              onClick={async (e) => {
                const newResult = {
                  usn,
                  sem,
                  year,
                  result,
                }
                const { data } = await fetchData(
                  process.env.REACT_APP_SERVER_URL + `/updateresult`,
                  'POST',
                  newResult
                )
                if (data.success) {
                  toast.success('Result updated')
                } else {
                  toast.error(data.message)
                }
                console.log(data)
              }}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddResult
