import { useState } from 'react'
import { toast } from 'react-toastify'
import { fetchData } from '../Helpers/Fetch'
import Loading from '../Helpers/LoadingScreen'

function RemoveUser() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState({ loading: false, text: '' })

  return (
    <div className="removeuser">
      <Loading loading={loading.loading} />
      <div className="title">Remove User</div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          if (username === '') return
          setLoading({ loading: true })
          const { data } = await fetchData(
            process.env.REACT_APP_SERVER_URL + '/removeuser',
            'POST',
            {
              username,
            }
          )
          setLoading({ loading: false })
          if (data.success) {
            toast.success('User Account Deleted Successfully')
          } else {
            toast.error(data.message)
          }
        }}
      >
        <label htmlFor="">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default RemoveUser
