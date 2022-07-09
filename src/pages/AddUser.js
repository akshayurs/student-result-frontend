import { useState } from 'react'
import { toast } from 'react-toastify'
import { fetchData } from '../Helpers/Fetch'
import Loading from '../Helpers/LoadingScreen'

function AddUser() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('student')
  const [loading, setLoading] = useState({ loading: false, text: '' })

  return (
    <div className="adduser">
      <Loading loading={loading.loading} />
      <div className="title">Add User</div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setLoading({ loading: true })

          const { data } = await fetchData(
            process.env.REACT_APP_SERVER_URL + '/signup',
            'POST',
            {
              username,
              password,
              name,
              email,
              userType,
            }
          )
          setLoading({ loading: false })
          if (data.status === 200) {
            toast.success('User Added')
            setName('')
            setUsername('')
            setEmail('')
            setPassword('')
            setUserType('')
          } else {
            toast.error(data.message)
          }
        }}
      >
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="name">Name</label>
              </td>
              <td>
                <input
                  required
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="username">Username</label>
              </td>
              <td>
                <input
                  required
                  value={username}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="username"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="password">Password</label>
              </td>
              <td>
                <input
                  required
                  value={password}
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email</label>
              </td>
              <td>
                <input
                  value={email}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="usertype">UserType</label>
              </td>
              <td>
                <select
                  id="usertype"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button>Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default AddUser
