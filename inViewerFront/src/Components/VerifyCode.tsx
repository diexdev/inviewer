import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { verifyCodeApi } from "../consts"

export function VerifyCode () {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [msg, setMsg] = useState<string | null>(null)
  const sent = useRef<boolean> (false)
  const navigate = useNavigate()

  const handleVerify = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formdata = new FormData(e.currentTarget)
    const code = formdata.get('code') as string
    const email = localStorage.getItem('email')

    if(!email) return setError('Email invalid, go back please')

    if(!code || code.length < 6) return setError('Enter a valid code')
    
    try {
        const res = await fetch(verifyCodeApi, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email, code})
      })

      const data = await res.json()

      if(!res.ok) {
        setLoading(false)
        if(data.message.includes('connect'))
          return setError('Bad Connection')
        return setError(data.message)
      }

      setMsg(data.message)
      sent.current = true
      localStorage.setItem('code', code)
      setError(null)
      setLoading(false)
    } catch (e) {
      const error = e as Error
      setError(error.message)
    }
  }
 
  return (
    <>
      <form className="verify-form" onSubmit={handleVerify}>
        <h3>Enter the code</h3>
        <input type="text" maxLength={6} name="code" placeholder="Enter the Code"/>
        <button disabled={loading || sent.current} type="submit">Verify</button>
        {error &&<p>{error}</p>}
        {msg && <p>{msg}</p>}
        <div className="send-options">
          <button onClick={() => navigate('/receiveCode')} type="button">Back</button>
          <button onClick={() => navigate('/setPassword')} disabled={sent.current === false} type="button">Next</button>
        </div>
        <Link to={'/'}>Log In</Link>
      </form>
    </>
  )
}