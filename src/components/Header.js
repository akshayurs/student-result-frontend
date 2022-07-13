import { fetchData } from '../Helpers/Fetch'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../Helpers/LoadingScreen'
import { useState } from 'react'
function Header({ loggedin, setLoggedin }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState({ loading: false, text: '' })
  return (
    <header>
      <Loading loading={loading.loading} />
      <p>
        <Link to="/">JSSSTU</Link>
      </p>
      {loggedin && (
        <button
          onClick={async () => {
            setLoading({ loading: true })
            const { data } = await fetchData(
              process.env.REACT_APP_SERVER_URL + '/signout'
            )
            setLoading({ loading: false })
            if (data.success) {
              navigate('/')
              setLoggedin(false)
              localStorage.setItem('userType', '')
              toast.success('You are successfully logged out')
            }
          }}
        >
          Logout
        </button>
      )}
    </header>
  )
}

export default Header
