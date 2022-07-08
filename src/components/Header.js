import { fetchData } from '../Helpers/Fetch'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function Header({ loggedin, setLoggedin }) {
  const navigate = useNavigate()
  return (
    <header>
      <p>COLLEGE</p>
      {loggedin && (
        <button
          onClick={async () => {
            const { data } = await fetchData(
              process.env.REACT_APP_SERVER_URL + '/signout'
            )
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
