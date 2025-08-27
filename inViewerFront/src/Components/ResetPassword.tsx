import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteFromLocal, resetPasswordApi } from "../consts"

export function ResetPassword () {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [msg, setMsg] = useState<string | null>(null)
  const sent = useRef<boolean> (false)
  const navigate = useNavigate()

  const handleChange = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formdata = new FormData(e.currentTarget)

    const newPassword = formdata.get('password') as string
    const confirm_password = formdata.get('confirm-password') as string
    const email = localStorage.getItem('email')
    const code = localStorage.getItem('code')

    if(!email) return setError('Email invalid, go back please')
    if(!code) return setError('Code invalid, go back please')
    if(!newPassword || !confirm_password) return setError('Enter the new Password')
    if(newPassword !== confirm_password) return setError('Passwords dont match')
      
    try {
      setLoading(true)
        const res = await fetch(resetPasswordApi , {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({newPassword, email, code})
      })

      const data = await res.json()

      if(!res.ok) {
        setLoading(false)
        if(data.message.includes('connect')) return setError('Bad Connection');
        return setError(data.message)
      }

      setMsg(data.message)
      sent.current = true
      localStorage.setItem('email', email)
      setError(null)
      setLoading(false)
      localStorage.removeItem('email')
      localStorage.removeItem('code')
    } catch (e) {
      const  error = e as Error
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <form className="reset-form" encType="multipart/form-data" onSubmit={handleChange}>
        <h3>Create a new Password</h3>
        <div className="reset-data">
          <input readOnly={sent.current} type="text" name="password" placeholder="Enter the new Password"/>
        <input type="text" name="confirm-password" placeholder="Confirm password"/>
        </div>
        {error && !loading &&<p>{error}</p>}
        {msg && <p>{msg}</p>}
        {loading && <p>Updating...</p>}
       <div className="send-options">
          <button disabled={loading || sent.current} type="submit">Save</button>
          <button disabled={loading} onClick={() => {
            deleteFromLocal()
            navigate('/receiveCode')
          }}>Back</button>
       </div>
        <Link to={'/'}>Log In</Link>
      </form>
    </>
  )
}