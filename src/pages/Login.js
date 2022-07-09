import { useState } from 'react'
import { fetchData } from '../Helpers/Fetch'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../Helpers/LoadingScreen'
import { useEffect } from 'react'
function Login({ userType, setUserType, loggedin, setLoggedin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState({ loading: false, text: '' })

  const navigator = useNavigate()
  useEffect(() => {
    if (!loggedin || userType === '') return
    localStorage.setItem('userType', userType)
    if (userType === 'student') {
      navigator('/student')
    }
    if (userType === 'teacher') {
      navigator('/teacher')
    }
    if (userType === 'admin') {
      navigator('/admin')
    }
  }, [userType, loggedin, navigator])
  return (
    <div className="login">
      <Loading loading={loading.loading} />
      <div className="container">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (username === '' || password === '') return
            setLoading({ loading: true })
            const { data } = await fetchData(
              process.env.REACT_APP_SERVER_URL + '/signin',
              'POST',
              {
                username,
                password,
              }
            )
            setLoading({ loading: false })
            if (data.success === true && data.status === 200) {
              setLoggedin(true)
              setUserType(data.userType)
              toast.success(
                `You are successfully logged in as ${data.username}`
              )
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
