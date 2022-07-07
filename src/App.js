import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom'
import AdminDefault from './pages/AdminDefault'
import { ToastContainer, toast } from 'react-toastify'
import Login from './pages/Login'
import { fetchData } from './Helpers/Fetch'
import StudentDefault from './pages/StudentDefault'
import TeacherDefault from './pages/TeacherDefault'
import './scss/main.scss'
import Header from './components/Header'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const navigate = useNavigate()
  const [loggedin, setLoggedin] = useState(false)
  const [userType, setUserType] = useState('')
  useEffect(() => {
    let loggedin = localStorage.getItem('loggedin')
    if (loggedin === 'true') setLoggedin(true)
    ;(async () => {
      const { data } = await fetchData(
        process.env.REACT_APP_SERVER_URL + '/checktoken'
      )
      if (data.status === 200) {
        localStorage.setItem('loggedin', 'true')
        setUserType(data.userType)
        setLoggedin(true)
        if (data.userType === 'admin') navigate('/admin')
        else if (data.userType === 'student') navigate('/student')
        else if (data.userType === 'teacher') navigator('/teacher')
      } else {
        localStorage.setItem('loggedin', 'false')
        setLoggedin(false)
      }
    })()
  }, [])
  let loggedInComponent = <></>
  if (userType === 'admin') loggedInComponent = <Navigate to="/admin" />
  else if (userType === 'student')
    loggedInComponent = <Navigate to="/student" />
  else if (userType === 'teacher')
    loggedInComponent = <Navigate to="/teacher" />
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={2000} />
      <Header setLoggedin={setLoggedin} loggedin={loggedin} />
      <Routes>
        <Route
          path="/"
          exact
          element={
            loggedin ? (
              loggedInComponent
            ) : (
              <Login loggedin={loggedin} setLoggedin={setLoggedin} />
            )
          }
        />
        <Route
          path="/student"
          exact
          element={
            userType === 'student' ? (
              <StudentDefault loggedin={loggedin} setLoggedin={setLoggedin} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/teacher"
          exact
          element={
            userType === 'teacher' ? (
              <TeacherDefault loggedin={loggedin} setLoggedin={setLoggedin} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin"
          exact
          element={
            userType === 'admin' ? (
              <AdminDefault loggedin={loggedin} setLoggedin={setLoggedin} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App
