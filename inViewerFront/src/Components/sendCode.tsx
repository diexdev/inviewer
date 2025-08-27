import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { receiveCodeApi } from "../consts"

export function AskForCode () {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)
  const sent = useRef<boolean> (false)
  const navigate = useNavigate()

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()

    const formdata = new FormData(e.currentTarget)
    const email = formdata.get('email') as string

    try {
      const res = await fetch(receiveCodeApi, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email})
      })

      const data = await res.json()

      if(!res.ok) {
        setLoading(false)
        if(data.message.includes('connect')) {
          return setError('Bad Connection')
        }
        return setError(data.message)
      }

      setMsg(data.message)
      sent.current = true
      localStorage.setItem('email', email)
      setError(null)
      setLoading(false)
    } catch (e) {
      const error = e as Error
      if (error.message.includes('connect') ||error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')){
        return setError('No Internet')
      }
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <>
      <form onSubmit={handleSubmit} className="send-code" encType="multipart/form-data">
        <h3>Enter your email</h3>
        <input type="email" placeholder="Enter your email" name="email"/>
        <div className="send-options">
          <button disabled={loading || sent.current} type="submit">{loading ? 'Sending' : 'Send Code'}</button>
        <button type='button' disabled={sent.current === false} className="next-button" onClick={() => navigate('/verifyCode')}>Next</button>
        </div>
        {error &&<p>{error}</p>}
        {msg && <p>{msg}</p>}
        <Link to={'/'}>Log In</Link>
      </form>
    </>
  )
}