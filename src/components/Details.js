import { useEffect, useState } from 'react'
import { fetchData } from '../Helpers/Fetch'

function Details() {
  const [details, setDetails] = useState({ name: '', usn: '', email: '' })
  useEffect(() => {
    ;(async () => {
      const { data } = await fetchData(
        process.env.REACT_APP_SERVER_URL + '/myDetails'
      )
      setDetails({
        usn: data.user.username,
        name: data.user.name,
        email: data.user.email,
      })
      console.log(data)
    })()
  }, [])
  return (
    <div className="details">
      <div className="name">Name : {details.name}</div>
      <div className="usn">Username : {details.usn}</div>
      <div className="email">Email : {details.email}</div>
    </div>
  )
}

export default Details
