import type React from "react"
import { useDispatch } from 'react-redux'
import { login } from "../actions/authActions.ts"
import type { AppDispatch } from "../store/store.ts"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { setError } from "../slices/userSlice.ts"
import { useUser } from "../hooks/useUser.ts"

export function LoginForm () {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const navigate = useNavigate()
  const { error, user, loading } = useUser()
  const dispatch = useDispatch<AppDispatch>()
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login({ username, password }))
  }

  useEffect(() => {
    dispatch(setError(null))
    if(user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  return (
    <>
      <form id="login-form" onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <div className="login-data">
          <input onChange={(e) => setUsername(e.target.value)} name="username" type="text" placeholder="Username" />
          <input onChange={(e) => setPassword(e.target.value)} name="password" type="text" placeholder="Password"/>
        </div>
        <button disabled={loading} type='submit' className="login-button">{loading ? 'loading' : 'Log In'}</button>
        <p className="error" style={{ color: '#e00'}}>
          { error !== null ? error : ''}
        </p>
        <div className="reset-register">
          <Link to={'/receiveCode'}>Forget your password</Link>
          <Link to={'/receiveEmailCode'}>Register</Link>
        </div>
      </form>
    </>
  )
}