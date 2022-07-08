import { useState } from 'react'
import { toast } from 'react-toastify'
import { fetchData } from '../Helpers/Fetch'

function RemoveUser() {
  const [username, setUsername] = useState('')
  return (
    <div className="removeuser">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const { data } = await fetchData(
            process.env.REACT_APP_SERVER_URL + '/removeuser',
            'POST',
            {
              username,
            }
          )
          if (data.success) {
            toast.success('User Account Deleted Successfully')
          } else {
            toast.error(data.message)
          }
        }}
      >
        <label htmlFor="">Username</label>
        <input type="text" />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default RemoveUser
