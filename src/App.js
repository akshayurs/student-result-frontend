import { useEffect, useState } from 'react'
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
  Router,
} from 'react-router-dom'
import AdminDefault from './pages/AdminDefault'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import { fetchData } from './Helpers/Fetch'
import StudentDefault from './pages/StudentDefault'
import TeacherDefault from './pages/TeacherDefault'
import './scss/main.scss'
import Header from './components/Header'
import AddUser from './pages/AddUser'
import 'react-toastify/dist/ReactToastify.css'
import RemoveUser from './pages/RemoveUser'
import Result from './pages/Result'
import ListUsers from './pages/ListUsers'
import PublishResult from './pages/PublishResult'
import AddResult from './pages/AddResult'
function App() {
  const navigate = useNavigate()
  const [loggedin, setLoggedin] = useState(false)
  const [userType, setUserType] = useState(localStorage.getItem('userType'))
  const location = useLocation()
  useEffect(() => {
    let loggedin = localStorage.getItem('loggedin')
    if (loggedin === 'true') setLoggedin(true)
    ;(async () => {
      const { data } = await fetchData(
        process.env.REACT_APP_SERVER_URL + '/checktoken'
      )
      if (data.status === 200) {
        localStorage.setItem('loggedin', 'true')
        localStorage.setItem('userType', data.userType)
        setUserType(data.userType)
        setLoggedin(true)
        if (location.pathname !== '/') return
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
            loggedin && location.pathname !== '/' ? (
              loggedInComponent
            ) : (
              <Login
                userType={userType}
                setUserType={setUserType}
                loggedin={loggedin}
                setLoggedin={setLoggedin}
              />
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
              // <Navigate to="/" />
              'zzzzzz'
            )
          }
        />
        <Route
          path="/adduser"
          exact
          element={userType === 'admin' ? <AddUser /> : <Navigate to="/" />}
        />
        <Route
          path="/removeuser"
          exact
          element={userType === 'admin' ? <RemoveUser /> : <Navigate to="/" />}
        />
        <Route
          path="/listusers"
          element={userType === 'admin' ? <ListUsers /> : <Navigate to="/" />}
        />
        <Route
          path="/publish"
          element={
            userType === 'admin' ? <PublishResult /> : <Navigate to="/" />
          }
        />
        <Route path="/addresult" element={<AddResult />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  )
}

export default App
