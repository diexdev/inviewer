import { useState } from "react"
import { useUser } from "../hooks/useUser"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { updateMyProfile } from "../actions/authActions"

export function UpdateProfile () {
  const { user } = useUser()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formdata = new FormData(e.currentTarget)

    const name = formdata.get('name') as string
    const username = formdata.get('username') as string
    
    if(!name || !username || !user) return setError('Complete the data')
      
    console.log('zzz')  
    dispatch(updateMyProfile({name, username, user_id:user.user_id, setError, setLoading}))
  }

  return (
    <>
      <form className="update-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Update your data</h2>
        <input name="name" defaultValue={user?.name} type="text" placeholder="Name"/>
        <input type="text" name="username" defaultValue={user?.username} placeholder="Username"/>
        <button disabled={loading} type="submit">Save</button>
        {error && !loading && <p className="error">{error}</p>}
        {loading && <p>Saving...</p>}
      </form>
    </>
  )
}