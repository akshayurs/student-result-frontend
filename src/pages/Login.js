import { useState } from 'react'
import { fetchData } from '../Helpers/Fetch'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function Login({ setLoggedin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigator = useNavigate()
  return (
    <div className="login">
      <div className="container">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const { data } = await fetchData(
              process.env.REACT_APP_SERVER_URL + '/signin',
              'POST',
              {
                username,
                password,
              }
            )
            if (data.success === true && data.status === 200) {
              setLoggedin(true)
              toast.success(
                `You are successfully logged in as ${data.username}`
              )
              if (data.userType === 'student') {
                navigator('/student')
              }
              if (data.userType === 'teacher') {
                navigator('/teacher')
              }
              if (data.userType === 'admin') {
                navigator('/admin')
              }
            } else {
              toast.error('Incorrect username/password')
            }
          }}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login
